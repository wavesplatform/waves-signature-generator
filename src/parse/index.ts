import {
    parseConstructor,
    toAccountScript,
    toAddressOrAlias,
    toAssetId,
    toBigNumber,
    toBoolean,
    toNewAlias,
    toNumber,
    toBase58,
    toStringWithLength,
    toTransfers,
    getNumberFromBytes, toData
} from './parseByteConscructor';
import { TRANSACTION_TYPE_NUMBER } from '../constants';


export function parseTransactionBytes(bytes: Uint8Array) {
    const type = getNumberFromBytes(bytes, 1);

    switch (type) {
        case TRANSACTION_TYPE_NUMBER.ISSUE:
            return parseIssueTx(bytes);
        case TRANSACTION_TYPE_NUMBER.TRANSFER:
            return parseTransferTx(bytes);
        case TRANSACTION_TYPE_NUMBER.REISSUE:
            return parseReissueTx(bytes);
        case TRANSACTION_TYPE_NUMBER.BURN:
            return parseBurnTx(bytes);
        case TRANSACTION_TYPE_NUMBER.LEASE:
            return parseLeaseTx(bytes);
        case TRANSACTION_TYPE_NUMBER.CANCEL_LEASING:
            return parseCancelLeaseTx(bytes);
        case TRANSACTION_TYPE_NUMBER.CREATE_ALIAS:
            return parseCreateAliasTx(bytes);
        case TRANSACTION_TYPE_NUMBER.MASS_TRANSFER:
            return parseMassTransferTx(bytes);
        case TRANSACTION_TYPE_NUMBER.EXCHANGE:
            throw new Error('Exchange transaction parser is not supported!');
        case TRANSACTION_TYPE_NUMBER.DATA:
            return parseDataTx(bytes);
        case TRANSACTION_TYPE_NUMBER.SET_SCRIPT:
            return parseSetScriptTx(bytes);
        case TRANSACTION_TYPE_NUMBER.SPONSORSHIP:
            return parseSponsorshipTx(bytes);
        default:
            throw new Error(`Type ${type} is not supported!`);
    }
}

export function parseOrderBytes() {

}

export const parseIssueTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toNumber('chainId'),
    toBase58('senderPublicKey'),
    toStringWithLength('name'),
    toStringWithLength('description'),
    toBigNumber('quantity'),
    toNumber('precision'),
    toBoolean('reissuable'),
    toBigNumber('fee'),
    toBigNumber('timestamp'),
    toBoolean('hasScript')
]);

export const parseTransferTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toBase58('senderPublicKey'),
    toAssetId('assetId'),
    toAssetId('feeAssetId'),
    toBigNumber('timestamp'),
    toBigNumber('amount'),
    toBigNumber('fee'),
    toAddressOrAlias('recipient'), // TODO! Add attachment
    toStringWithLength('attachment') // TODO! Add attachment parser
]);

export const parseReissueTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toNumber('chainId'),
    toBase58('senderPublicKey'),
    toBase58('assetId'),
    toBigNumber('quantity'),
    toBoolean('reissuable'),
    toBigNumber('fee'),
    toBigNumber('timestamp')
]);

export const parseBurnTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toNumber('chainId'),
    toBase58('senderPublicKey'),
    toBase58('assetId'),
    toBigNumber('quantity'),
    toBigNumber('fee'),
    toBigNumber('timestamp')
]);

export const parseLeaseTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toAssetId('leaseAssetId'),
    toBase58('senderPublicKey'),
    toAddressOrAlias('recipient'),
    toBigNumber('amount'),
    toBigNumber('fee'),
    toBigNumber('timestamp')
]);

export const parseCancelLeaseTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toNumber('chainId'),
    toBase58('senderPublicKey'),
    toBigNumber('fee'),
    toBigNumber('timestamp'),
    toBase58('transactionId')
]);

export const parseCreateAliasTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toBase58('senderPublicKey'),
    toNewAlias('alias'),
    toBigNumber('fee'),
    toBigNumber('timestamp')
]);

export const parseMassTransferTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toBase58('senderPublicKey'),
    toAssetId('assetId'),
    toTransfers('transfers'),
    toBigNumber('timestamp'),
    toBigNumber('fee'),
    toStringWithLength('attachment')
]);

export const parseDataTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toBase58('senderPublicKey'),
    toData('data'),
    toBigNumber('timestamp'),
    toBigNumber('fee')
]);

export const parseSetScriptTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toNumber('chainId'),
    toBase58('senderPublicKey'),
    toAccountScript('script'),
    toBigNumber('fee'),
    toBigNumber('timestamp')
]);

export const parseSponsorshipTx = parseConstructor([
    toNumber('type'),
    toNumber('version'),
    toBase58('senderPublicKey'),
    toBase58('assetId'),
    toBigNumber('minSponsoredAssetFee'),
    toBigNumber('fee'),
    toBigNumber('timestamp')
]);
