import { TRANSACTION_TYPE, TRANSACTION_TYPE_NUMBER } from '../constants';


export interface ISignatureGenerator {

    getSignature(privateKey: string): Promise<string>;

    getBytes(): Promise<Uint8Array>;

    getExactBytes(fieldName: string): Promise<Uint8Array>;
}

export interface ISignatureGeneratorConstructor<T> {
    new(data: T): ISignatureGenerator;
}

export interface IDEFAULT_PROPS {
    senderPublicKey: string;
    timestamp: number;
}

export interface IISSUE_PROPS extends IDEFAULT_PROPS {
    name: string;
    description: string;
    quantity: string;
    precision: number;
    reissuable: boolean;
    fee: string;
}

export interface ITRANSFER_PROPS extends IDEFAULT_PROPS {
    assetId: string;
    feeAssetId: string;
    amount: string;
    fee: string;
    recipient: string;
    attachment: string;
}

export interface IREISSUE_PROPS extends IDEFAULT_PROPS {
    assetId: string;
    quantity: string;
    reissuable: boolean;
    fee: string;
}

export interface IBURN_PROPS extends IDEFAULT_PROPS {
    assetId: string;
    quantity: string;
    fee: string;
}

export interface ILEASE_PROPS extends IDEFAULT_PROPS {
    recipient: string;
    amount: string;
    fee: string;
}

export interface ICANCEL_LEASING_PROPS extends IDEFAULT_PROPS {
    fee: string;
    transactionId: string;
}

export interface ICREATE_ALIAS_PROPS extends IDEFAULT_PROPS {
    alias: string;
    fee: string;
}

export interface IORDER_PROPS extends IDEFAULT_PROPS {
    matcherPublicKey: string;
    amountAsset: string;
    priceAsset: string;
    orderType: string;
    price: string;
    amount: string;
    expiration: number;
    matcherFee: string;
}

export interface ICANCEL_ORDER_PROPS {
    senderPublicKey: string;
    orderId: string;
}

export type TTX_NUMBER_MAP = {
    [TRANSACTION_TYPE_NUMBER.ISSUE]: ISignatureGeneratorConstructor<IISSUE_PROPS>;
    [TRANSACTION_TYPE_NUMBER.TRANSFER]: ISignatureGeneratorConstructor<ITRANSFER_PROPS>;
    [TRANSACTION_TYPE_NUMBER.REISSUE]: ISignatureGeneratorConstructor<IREISSUE_PROPS>;
    [TRANSACTION_TYPE_NUMBER.BURN]: ISignatureGeneratorConstructor<IBURN_PROPS>;
    [TRANSACTION_TYPE_NUMBER.LEASE]: ISignatureGeneratorConstructor<ILEASE_PROPS>;
    [TRANSACTION_TYPE_NUMBER.LEASE]: ISignatureGeneratorConstructor<ILEASE_PROPS>;
    [TRANSACTION_TYPE_NUMBER.CANCEL_LEASING]: ISignatureGeneratorConstructor<ICANCEL_LEASING_PROPS>;
    [TRANSACTION_TYPE_NUMBER.CREATE_ALIAS]: ISignatureGeneratorConstructor<ICREATE_ALIAS_PROPS>;
}

export type TTX_TYPE_MAP = {
    [TRANSACTION_TYPE.ISSUE]: ISignatureGeneratorConstructor<IISSUE_PROPS>;
    [TRANSACTION_TYPE.TRANSFER]: ISignatureGeneratorConstructor<ITRANSFER_PROPS>;
    [TRANSACTION_TYPE.REISSUE]: ISignatureGeneratorConstructor<IREISSUE_PROPS>;
    [TRANSACTION_TYPE.BURN]: ISignatureGeneratorConstructor<IBURN_PROPS>;
    [TRANSACTION_TYPE.LEASE]: ISignatureGeneratorConstructor<ILEASE_PROPS>;
    [TRANSACTION_TYPE.LEASE]: ISignatureGeneratorConstructor<ILEASE_PROPS>;
    [TRANSACTION_TYPE.CANCEL_LEASING]: ISignatureGeneratorConstructor<ICANCEL_LEASING_PROPS>;
    [TRANSACTION_TYPE.CREATE_ALIAS]: ISignatureGeneratorConstructor<ICREATE_ALIAS_PROPS>;
}
