import {
    Alias,
    AssetId,
    Attachment,
    Base58, Base64, Base64Asset,
    Bool,
    ByteProcessor,
    DataEntries,
    IDATA_PROPS,
    IMASS_TRANSFER_PROPS,
    ISET_SCRIPT_PROPS,
    ISET_ASSET_SCRIPT_PROPS,
    ISPONSORSHIP_PROPS,
    MandatoryAssetId,
    OrderType,
    Recipient,
    StringWithLength,
    ScriptVersion,
    Transfers,
    TRANSACTION_TYPE_NUMBER, IEXCHANGE_PROPS, IEXCHANGE_PROPS_V2, Int,
    IREISSUE_PROPS_V2, IBURN_PROPS_V2,
    ICANCEL_LEASING_PROPS_V2
} from '..';
import {
    IBURN_PROPS,
    ICANCEL_LEASING_PROPS,
    ICANCEL_ORDER_PROPS,
    ICREATE_ALIAS_PROPS,
    IDEFAULT_PROPS,
    IISSUE_PROPS,
    ILEASE_PROPS,
    IORDER_PROPS,
    IREISSUE_PROPS,
    ISignatureGenerator,
    ISignatureGeneratorConstructor,
    ITRANSFER_PROPS,
    TTX_NUMBER_MAP,
    TTX_TYPE_MAP
} from './interface';
import { concatUint8Arrays } from '../utils/concat';
import crypto from '../utils/crypto';
import * as constants from '../constants';
import convert from '../utils/convert';
import base58 from '../libs/base58';


const ERRORS = {
    NO_DATA: { code: 'NO_DATA', message: 'No data' },
    FIELD_ERROR: { code: 'FIELD_ERROR', message: 'Invalid field', field: null },
};


export function generate<T>(fields: Array<ByteProcessor | number>): ISignatureGeneratorConstructor<T> {

    const errors: Array<any> = [];

    if (!fields || !fields.length) {
        errors.push(ERRORS.NO_DATA);
    }

    // Fields of the original data object
    const storedFields: Record<string, ByteProcessor> = Object.create(null);

    // Data bytes or functions returning data bytes via promises
    const byteProviders: Array<Function | Uint8Array> = [];

    fields.forEach((field: ByteProcessor | number) => {
        if (field instanceof ByteProcessor) {
            // Remember user data fields
            storedFields[field.name] = field;
            // All user data must be represented as bytes
            byteProviders.push((data: any) => {
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
        private readonly _rawData: any;

        private _errors = [];

        constructor(hashMap: any = {}) {

            // Save all needed values from user data
            this._rawData = Object.keys(storedFields).reduce((store: any, key: any) => {
                store[key] = hashMap[key];
                return store;
            }, {});

            this._dataHolders = byteProviders.map((provider) => {
                if (typeof provider === 'function') {
                    // Execute function so that they return promises containing Uint8Array data
                    try {
                        return provider(this._rawData);
                    } catch (e) {
                        // @ts-ignore
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
    new Int('price', 8),
    new Int('amount', 8),
    new Int('timestamp', 8),
    new Int('expiration', 8),
    new Int('matcherFee', 8)
]);

export const CREATE_ORDER_SIGNATURE_V2 = generate<IORDER_PROPS>([
    constants.ORDER_VERSION,
    new Base58('senderPublicKey'),
    new Base58('matcherPublicKey'),
    new AssetId('amountAsset'),
    new AssetId('priceAsset'),
    new OrderType('orderType'),
    new Int('price', 8),
    new Int('amount', 8),
    new Int('timestamp', 8),
    new Int('expiration', 8),
    new Int('matcherFee', 8)
]);

export const AUTH_ORDER_SIGNATURE = generate<IDEFAULT_PROPS>([
    new Base58('senderPublicKey'),
    new Int('timestamp', 8)
]);

export const CANCEL_ORDER_SIGNATURE = generate<ICANCEL_ORDER_PROPS>([
    new Base58('senderPublicKey'),
    new Base58('orderId')
]);

export const CANCEL_ALL_ORDERS_SIGNATURE = generate<IDEFAULT_PROPS>([
    new Base58('senderPublicKey'),
    new Int('timestamp', 8)
]);

export const MATCHER_BYTES_GENERATOR_MAP = {
    CREATE_ORDER: {
        1: CREATE_ORDER_SIGNATURE,
        2: CREATE_ORDER_SIGNATURE_V2
    },
    AUTH_ORDER: {
        1: AUTH_ORDER_SIGNATURE
    },
    CANCEL_ORDER: {
        1: CANCEL_ORDER_SIGNATURE
    },
    CANCEL_ALL_ORDERS: {
        1: CANCEL_ALL_ORDERS_SIGNATURE
    }
};

export const ISSUE = generate<IISSUE_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.ISSUE,
    new Base58('senderPublicKey'),
    new StringWithLength('name'),
    new StringWithLength('description'),
    new Int('quantity', 8),
    new Int('precision', 1),
    new Bool('reissuable'),
    new Int('fee', 8),
    new Int('timestamp', 8),
    new ScriptVersion('script'),
    new Base64Asset('script'),
]);

export const ISSUE_V2 = generate<IISSUE_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.ISSUE,
    2,
    new Int('chainId', 1),
    new Base58('senderPublicKey'),
    new StringWithLength('name'),
    new StringWithLength('description'),
    new Int('quantity', 8),
    new Int('precision', 1),
    new Bool('reissuable'),
    new Int('fee', 8),
    new Int('timestamp', 8),
    new ScriptVersion('script'),
    new Base64Asset('script'),
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.ISSUE] = ISSUE_V2;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.ISSUE] = ISSUE_V2;

export const TRANSFER = generate<ITRANSFER_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.TRANSFER,
    new Base58('senderPublicKey'),
    new AssetId('assetId'),
    new AssetId('feeAssetId'),
    new Int('timestamp', 8),
    new Int('amount', 8),
    new Int('fee', 8),
    new Recipient('recipient'),
    new Attachment('attachment')
]);

export const TRANSFER_V2 = generate<ITRANSFER_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.TRANSFER,
    2,
    new Base58('senderPublicKey'),
    new AssetId('assetId'),
    new AssetId('feeAssetId'),
    new Int('timestamp', 8),
    new Int('amount', 8),
    new Int('fee', 8),
    new Recipient('recipient'),
    new Attachment('attachment')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.TRANSFER] = TRANSFER_V2;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.TRANSFER] = TRANSFER_V2;

export const REISSUE = generate<IREISSUE_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.REISSUE,
    new Base58('senderPublicKey'),
    new MandatoryAssetId('assetId'),
    new Int('quantity', 8),
    new Bool('reissuable'),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

export const REISSUE_V2 = generate<IREISSUE_PROPS_V2>([
    constants.TRANSACTION_TYPE_NUMBER.REISSUE,
    2,
    new Int('chainId', 1),
    new Base58('senderPublicKey'),
    new MandatoryAssetId('assetId'),
    new Int('quantity', 8),
    new Bool('reissuable'),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.REISSUE] = REISSUE_V2;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.REISSUE] = REISSUE_V2;

export const BURN = generate<IBURN_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.BURN,
    new Base58('senderPublicKey'),
    new MandatoryAssetId('assetId'),
    new Int('quantity', 8),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

export const BURN_V2 = generate<IBURN_PROPS_V2>([
    constants.TRANSACTION_TYPE_NUMBER.BURN,
    2,
    new Int('chainId', 1),
    new Base58('senderPublicKey'),
    new MandatoryAssetId('assetId'),
    new Int('quantity', 8),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.BURN] = BURN_V2;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.BURN] = BURN_V2;

export class Order extends ByteProcessor {

    public process(value: IORDER_PROPS & ({ version: 2, proofs: Array<string> } | { version?: 1, signature: string })): Promise<Uint8Array> {
        const version = value.version || 0;
        const generator = (MATCHER_BYTES_GENERATOR_MAP as any).CREATE_ORDER[version] as ISignatureGeneratorConstructor<IORDER_PROPS>;

        if (!generator) {
            throw new Error(`Has no order schema with version "${version}"`);
        }

        let signatureBytes: Uint8Array;

        if (value.version === 2) {
            const proofsBytes = value.proofs.map(proof => {
                const proofBytes = base58.decode(proof);

                return concatUint8Arrays(
                    Uint8Array.from(convert.longToByteArray(proofBytes.length, 2)),
                    proofBytes
                );
            });

            signatureBytes = concatUint8Arrays(
                Uint8Array.from([1]),
                Uint8Array.from(convert.longToByteArray(value.proofs.length, 2)),
                ...proofsBytes
            );
        } else {
            signatureBytes = base58.decode(value.signature);
        }

        return new generator(value).getBytes().then(bytes => {
            return concatUint8Arrays(
                Uint8Array.from(convert.longToByteArray(bytes.length + signatureBytes.length, 4)),
                Uint8Array.from(convert.longToByteArray(version || 1, 1)),
                bytes.slice(version === 2 ? 1 : 0),
                signatureBytes
            );
        });
    }

}

export const EXCHANGE = generate<IEXCHANGE_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.EXCHANGE,
    new Order('buyOrder'),
    new Order('sellOrder'),
    new Int('price', 8),
    new Int('amount', 8),
    new Int('buyMatcherFee', 8),
    new Int('sellMatcherFee', 8),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

export const EXCHANGE_V2 = generate<IEXCHANGE_PROPS_V2>([
    0,
    constants.TRANSACTION_TYPE_NUMBER.EXCHANGE,
    constants.TRANSACTION_TYPE_VERSION.EXCHANGE,
    new Order('buyOrder'),
    new Order('sellOrder'),
    new Int('price', 8),
    new Int('amount', 8),
    new Int('buyMatcherFee', 8),
    new Int('sellMatcherFee', 8),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

export const LEASE = generate<ILEASE_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.LEASE,
    0, // Asset id for lease custom asset (dos't work)
    new Base58('senderPublicKey'),
    new Recipient('recipient'),
    new Int('amount', 8),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

export const LEASE_V2 = generate<ILEASE_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.LEASE,
    2,
    0, // Asset id for lease custom asset (dos't work)
    new Base58('senderPublicKey'),
    new Recipient('recipient'),
    new Int('amount', 8),
    new Int('fee', 8),
    new Int('timestamp', 8),
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.LEASE] = LEASE_V2;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.LEASE] = LEASE_V2;

export const CANCEL_LEASING = generate<ICANCEL_LEASING_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.CANCEL_LEASING,
    new Base58('senderPublicKey'),
    new Int('fee', 8),
    new Int('timestamp', 8),
    new Base58('transactionId')
]);

export const CANCEL_LEASING_V2 = generate<ICANCEL_LEASING_PROPS_V2>([
    constants.TRANSACTION_TYPE_NUMBER.CANCEL_LEASING,
    2,
    new Int('chainId', 1),
    new Base58('senderPublicKey'),
    new Int('fee', 8),
    new Int('timestamp', 8),
    new Base58('transactionId')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.CANCEL_LEASING] = CANCEL_LEASING_V2;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.CANCEL_LEASING] = CANCEL_LEASING_V2;

export const CREATE_ALIAS = generate<ICREATE_ALIAS_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.CREATE_ALIAS,
    new Base58('senderPublicKey'),
    new Alias('alias'),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

export const CREATE_ALIAS_V2 = generate<ICREATE_ALIAS_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.CREATE_ALIAS,
    2,
    new Base58('senderPublicKey'),
    new Alias('alias'),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.CREATE_ALIAS] = CREATE_ALIAS_V2;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.CREATE_ALIAS] = CREATE_ALIAS_V2;

export const MASS_TRANSFER = generate<IMASS_TRANSFER_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.MASS_TRANSFER,
    constants.TRANSACTION_TYPE_VERSION.MASS_TRANSFER,
    new Base58('senderPublicKey'),
    new AssetId('assetId'),
    new Transfers('transfers'),
    new Int('timestamp', 8),
    new Int('fee', 8),
    new Attachment('attachment')
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.MASS_TRANSFER] = MASS_TRANSFER;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.MASS_TRANSFER] = MASS_TRANSFER;

export const DATA = generate<IDATA_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.DATA,
    constants.TRANSACTION_TYPE_VERSION.DATA,
    new Base58('senderPublicKey'),
    new DataEntries('data'),
    new Int('timestamp', 8),
    new Int('fee', 8)
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.DATA] = DATA;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.DATA] = DATA;

export const SET_SCRIPT = generate<ISET_SCRIPT_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.SET_SCRIPT,
    constants.TRANSACTION_TYPE_VERSION.SET_SCRIPT,
    new Int('chainId', 1),
    new Base58('senderPublicKey'),
    new ScriptVersion('script'),
    new Base64('script'),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.SET_SCRIPT] = SET_SCRIPT;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.SET_SCRIPT] = SET_SCRIPT;

export const SET_ASSET_SCRIPT = generate<ISET_ASSET_SCRIPT_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.SET_ASSET_SCRIPT,
    constants.TRANSACTION_TYPE_VERSION.SET_ASSET_SCRIPT,
    new Int('chainId', 1),
    new Base58('senderPublicKey'),
    new MandatoryAssetId('assetId'),
    new Int('fee', 8),
    new Int('timestamp', 8),
    new ScriptVersion('script'),
    new Base64('script'),
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.SET_ASSET_SCRIPT] = SET_ASSET_SCRIPT;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.SET_ASSET_SCRIPT] = SET_ASSET_SCRIPT;

export const SPONSORSHIP = generate<ISPONSORSHIP_PROPS>([
    constants.TRANSACTION_TYPE_NUMBER.SPONSORSHIP,
    constants.TRANSACTION_TYPE_VERSION.SPONSORSHIP,
    new Base58('senderPublicKey'),
    new Base58('assetId'), // Not the AssetId byte processor
    new Int('minSponsoredAssetFee', 8),
    new Int('fee', 8),
    new Int('timestamp', 8)
]);

TX_NUMBER_MAP[constants.TRANSACTION_TYPE_NUMBER.SPONSORSHIP] = SPONSORSHIP;
TX_TYPE_MAP[constants.TRANSACTION_TYPE.SPONSORSHIP] = SPONSORSHIP;

export const BYTES_GENERATORS_MAP: Record<TRANSACTION_TYPE_NUMBER, Record<number, ISignatureGeneratorConstructor<any>>> = {
    [TRANSACTION_TYPE_NUMBER.ISSUE]: {
        1: ISSUE,
        2: ISSUE_V2
    },
    [TRANSACTION_TYPE_NUMBER.TRANSFER]: {
        1: TRANSFER,
        2: TRANSFER_V2
    },
    [TRANSACTION_TYPE_NUMBER.REISSUE]: {
        1: REISSUE,
        2: REISSUE_V2
    },
    [TRANSACTION_TYPE_NUMBER.BURN]: {
        1: BURN,
        2: BURN_V2
    },
    [TRANSACTION_TYPE_NUMBER.EXCHANGE]: {
        1: EXCHANGE,
        2: EXCHANGE_V2
    },
    [TRANSACTION_TYPE_NUMBER.LEASE]: {
        1: LEASE,
        2: LEASE_V2
    },
    [TRANSACTION_TYPE_NUMBER.CANCEL_LEASING]: {
        1: CANCEL_LEASING,
        2: CANCEL_LEASING_V2
    },
    [TRANSACTION_TYPE_NUMBER.CREATE_ALIAS]: {
        1: CREATE_ALIAS,
        2: CREATE_ALIAS_V2
    },
    [TRANSACTION_TYPE_NUMBER.MASS_TRANSFER]: {
        1: MASS_TRANSFER
    },
    [TRANSACTION_TYPE_NUMBER.DATA]: {
        1: DATA
    },
    [TRANSACTION_TYPE_NUMBER.SET_SCRIPT]: {
        1: SET_SCRIPT
    },
    [TRANSACTION_TYPE_NUMBER.SPONSORSHIP]: {
        1: SPONSORSHIP
    },
    [TRANSACTION_TYPE_NUMBER.SET_ASSET_SCRIPT]: {
        1: SET_ASSET_SCRIPT
    }
} as any;
