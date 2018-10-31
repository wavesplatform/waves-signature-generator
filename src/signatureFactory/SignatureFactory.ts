import {
    Alias,
    AssetId,
    Attachment,
    Base58, Base64,
    Bool,
    Byte,
    ByteProcessor, DataEntries, IDATA_PROPS, IMASS_TRANSFER_PROPS, ISET_SCRIPT_PROPS, ISPONSORSHIP_PROPS,
    Long,
    MandatoryAssetId, OrderType,
    Recipient,
    StringWithLength,
    ScriptVersion,
    Transfers,
} from '..';
import {
    IBURN_PROPS, ICANCEL_LEASING_PROPS, ICANCEL_ORDER_PROPS, ICREATE_ALIAS_PROPS, IDEFAULT_PROPS,
    IISSUE_PROPS, ILEASE_PROPS, IORDER_PROPS, IREISSUE_PROPS,
    ISignatureGenerator,
    ISignatureGeneratorConstructor, ITRANSFER_PROPS,
    TTX_NUMBER_MAP,
    TTX_TYPE_MAP
} from './interface';
import { concatUint8Arrays } from '../utils/concat';
import crypto from '../utils/crypto';
import * as constants from '../constants';

const ERRORS = {
    NO_DATA: { code: 'NO_DATA', message: 'No data' },
    FIELD_ERROR: { code: 'FIELD_ERROR', message: 'Invalid field', field: null },
};


export function generate<T>(fields: Array<ByteProcessor | number>): ISignatureGeneratorConstructor<T> {

    const errors = [];
    
    if (!fields || !fields.length) {
        errors.push(ERRORS.NO_DATA);
    }

    // Fields of the original data object
    const storedFields: object = Object.create(null);

    // Data bytes or functions returning data bytes via promises
    const byteProviders: Array<Function | Uint8Array> = [];

    fields.forEach(function (field: ByteProcessor) {
        if (field instanceof ByteProcessor) {
            // Remember user data fields
            storedFields[field.name] = field;
            // All user data must be represented as bytes
            byteProviders.push((data) => {
                try {
                    return field.process(data[field.name]);
                } catch (e) {
                    throw { ...ERRORS.FIELD_ERROR, field: field.name, message: e.message };
                }
            });
        } else if (typeof field === 'number') {
            // All static data must be converted to bytes as well
            byteProviders.push(Uint8Array.from([field]));
        } else {
            errors.push({ ...ERRORS.FIELD_ERROR, field });
        }
    });
    
    if (errors.length) {
        throw errors;
    }
    
    class SignatureGenerator implements ISignatureGenerator {

        // Array of Uint8Array and promises which return Uint8Array
        private readonly _dataHolders: Array<Uint8Array | Promise<Uint8Array>>;
        // Request data provided by user
        private readonly _rawData: object;
        
        private _errors = [];

        constructor(hashMap: any = {}) {

            // Save all needed values from user data
            this._rawData = Object.keys(storedFields).reduce((store, key) => {
                store[key] = hashMap[key];
                return store;
            }, {});

            this._dataHolders = byteProviders.map((provider) => {
                if (typeof provider === 'function') {
                    // Execute function so that they return promises containing Uint8Array data
                    try {
                        return provider(this._rawData);
                    } catch (e) {
                        this._errors.push(e);
                    }
                } else {
                    // Or just pass Uint8Array data
                    return provider;
                }
            });
            
            if (this._errors.length) {
                throw this._errors;
            }
        }

        public getSignature(privateKey: string): Promise<string> {
            return this.getBytes().then((dataBytes) => {
                return crypto.buildTransactionSignature(dataBytes, privateKey);
            });
        }

        // Get byte representation of the transaction
        public getBytes(): Promise<Uint8Array> {
            return Promise.all(this._dataHolders).then((multipleDataBytes: Uint8Array[]) => {
                if (multipleDataBytes.length === 1) {
                    return multipleDataBytes[0];
                } else {
                    return concatUint8Arrays(...multipleDataBytes);
                }
            });
        }

        public getDebugBytes(): Promise<Array<{ bytes: Uint8Array, from: any, value: any }>> {
            return Promise.all(fields.map((field: any, i) => {
                const value = field && field.name ? this._rawData[field.name] : null;
                const result = this._dataHolders[i];
                if (result instanceof Promise) {
                    return result.then(bytes => {
                        return { bytes, from: field && field.name || field, value };
                    });
                } else {
                    return Promise.resolve({ bytes: result, from: field, value });
                }
            }));
        }

        // Get bytes of an exact field from user data
        public getExactBytes(fieldName: string): Promise<Uint8Array> {

            if (!(fieldName in storedFields)) {
                throw new Error(`There is no field '${fieldName}' in 'RequestDataType class`);
            }

            const byteProcessor = storedFields[fieldName];
            const userData = this._rawData[fieldName];
            return byteProcessor.process(userData);
        }

    }

    return SignatureGenerator;
}

export const TX_NUMBER_MAP: TTX_NUMBER_MAP = Object.create(null);
export const TX_TYPE_MAP: TTX_TYPE_MAP = Object.create(null);

export const CREATE_ORDER_SIGNATURE = generate<IORDER_PROPS>([
    new Base58('senderPublicKey'),
    new Base58('matcherPublicKey'),
    new AssetId('amountAsset'),
    new AssetId('priceAsset'),
    new OrderType('orderType'),
    new Long('price'),
    new Long('amount'),
    new Long('timestamp'),
    new Long('expiration'),
    new Long('matcherFee')
]);

export const AUTH_ORDER_SIGNATURE = generate<IDEFAULT_PROPS>([
    new Base58('senderPublicKey'),
    new Long('timestamp')
]);

export const CANCEL_ORDER_SIGNATURE = generate<ICANCEL_ORDER_PROPS>([
    new Base58('senderPublicKey'),
    new Base58('orderId')
]);

const ISSUE = generate<IISSUE_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.ISSUE,
    constants.TRANSACTION_TYPE_VERSION.ISSUE,
    new Byte('chainId'),
    new Base58('senderPublicKey'),
    new StringWithLength('name'),
    new StringWithLength('description'),
    new Long('quantity'),
    new Byte('precision'),
    new Bool('reissuable'),
    new Long('fee'),
    new Long('timestamp'),
    0 // Byte for script smart assets.
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.ISSUE] = ISSUE;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.ISSUE] = ISSUE;

const TRANSFER = generate<ITRANSFER_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.TRANSFER,
    constants.TRANSACTION_TYPE_VERSION.TRANSFER,
    new Base58('senderPublicKey'),
    new AssetId('assetId'),
    new AssetId('feeAssetId'),
    new Long('timestamp'),
    new Long('amount'),
    new Long('fee'),
    new Recipient('recipient'),
    new Attachment('attachment')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.TRANSFER] = TRANSFER;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.TRANSFER] = TRANSFER;

const REISSUE = generate<IREISSUE_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.REISSUE,
    constants.TRANSACTION_TYPE_VERSION.REISSUE,
    new Byte('chainId'),
    new Base58('senderPublicKey'),
    new MandatoryAssetId('assetId'),
    new Long('quantity'),
    new Bool('reissuable'),
    new Long('fee'),
    new Long('timestamp')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.REISSUE] = REISSUE;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.REISSUE] = REISSUE;

const BURN = generate<IBURN_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.BURN,
    constants.TRANSACTION_TYPE_VERSION.BURN,
    new Byte('chainId'),
    new Base58('senderPublicKey'),
    new MandatoryAssetId('assetId'),
    new Long('quantity'),
    new Long('fee'),
    new Long('timestamp')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.BURN] = BURN;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.BURN] = BURN;

const LEASE = generate<ILEASE_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.LEASE,
    constants.TRANSACTION_TYPE_VERSION.LEASE,
    0, // Asset id for lease custom asset (dos't work)
    new Base58('senderPublicKey'),
    new Recipient('recipient'),
    new Long('amount'),
    new Long('fee'),
    new Long('timestamp')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.LEASE] = LEASE;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.LEASE] = LEASE;

const CANCEL_LEASING = generate<ICANCEL_LEASING_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.CANCEL_LEASING,
    constants.TRANSACTION_TYPE_VERSION.CANCEL_LEASING,
    new Byte('chainId'),
    new Base58('senderPublicKey'),
    new Long('fee'),
    new Long('timestamp'),
    new Base58('transactionId')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.CANCEL_LEASING] = CANCEL_LEASING;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.CANCEL_LEASING] = CANCEL_LEASING;

const CREATE_ALIAS = generate<ICREATE_ALIAS_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.CREATE_ALIAS,
    constants.TRANSACTION_TYPE_VERSION.CREATE_ALIAS,
    new Base58('senderPublicKey'),
    new Alias('alias'),
    new Long('fee'),
    new Long('timestamp')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.CREATE_ALIAS] = CREATE_ALIAS;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.CREATE_ALIAS] = CREATE_ALIAS;

const MASS_TRANSFER = generate<IMASS_TRANSFER_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.MASS_TRANSFER,
    constants.TRANSACTION_TYPE_VERSION.MASS_TRANSFER,
    new Base58('senderPublicKey'),
    new AssetId('assetId'),
    new Transfers('transfers'),
    new Long('timestamp'),
    new Long('fee'),
    new Attachment('attachment')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.MASS_TRANSFER] = MASS_TRANSFER;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.MASS_TRANSFER] = MASS_TRANSFER;

const DATA = generate<IDATA_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.DATA,
    constants.TRANSACTION_TYPE_VERSION.DATA,
    new Base58('senderPublicKey'),
    new DataEntries('data'),
    new Long('timestamp'),
    new Long('fee')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.DATA] = DATA;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.DATA] = DATA;

const SET_SCRIPT = generate<ISET_SCRIPT_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.SET_SCRIPT,
    constants.TRANSACTION_TYPE_VERSION.SET_SCRIPT,
    new Byte('chainId'),
    new Base58('senderPublicKey'),
    new ScriptVersion('script'),
    new Base64('script'),
    new Long('fee'),
    new Long('timestamp')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.SET_SCRIPT] = SET_SCRIPT;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.SET_SCRIPT] = SET_SCRIPT;

const SPONSORSHIP = generate<ISPONSORSHIP_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.SPONSORSHIP,
    constants.TRANSACTION_TYPE_VERSION.SPONSORSHIP,
    new Base58('senderPublicKey'),
    new Base58('assetId'), // Not the AssetId byte processor
    new Long('minSponsoredAssetFee'),
    new Long('fee'),
    new Long('timestamp')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.SPONSORSHIP] = SPONSORSHIP;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.SPONSORSHIP] = SPONSORSHIP;
