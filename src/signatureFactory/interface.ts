import { TLong, TOrderType } from '../interface';


export interface ISignatureGenerator {

    getSignature(privateKey: string): Promise<string>;

    getBytes(): Promise<Uint8Array>;

    getDebugBytes(): Promise<Array<{ bytes: Uint8Array, from: any, value: any }>>;

    getExactBytes(fieldName: string): Promise<Uint8Array>;
}

export interface ISignatureGeneratorConstructor<T> {
    new(data: T): ISignatureGenerator;
}

export interface IDEFAULT_PROPS {
    senderPublicKey: string;
    timestamp: number | TLong;
}

export interface IISSUE_PROPS extends IDEFAULT_PROPS {
    chainId: number;
    name: string;
    description: string;
    quantity: TLong;
    precision: number;
    reissuable: boolean;
    script: string;
    fee: TLong;
}

export interface ITRANSFER_PROPS extends IDEFAULT_PROPS {
    assetId: string;
    feeAssetId: string;
    amount: TLong;
    fee: TLong;
    recipient: string;
    attachment: string;
}

export interface IREISSUE_PROPS extends IDEFAULT_PROPS {
    assetId: string;
    quantity: TLong;
    reissuable: boolean;
    fee: TLong;
}

export interface IBURN_PROPS extends IDEFAULT_PROPS {
    assetId: string;
    quantity: TLong;
    fee: string;
}

export interface ILEASE_PROPS extends IDEFAULT_PROPS {
    recipient: string;
    amount: TLong;
    fee: TLong;
}

export interface ICANCEL_LEASING_PROPS extends IDEFAULT_PROPS {
    fee: TLong;
    transactionId: string;
}

export interface ICREATE_ALIAS_PROPS extends IDEFAULT_PROPS {
    alias: string;
    fee: TLong;
}

export interface IMASS_TRANSFER_PROPS extends IDEFAULT_PROPS {
    assetId: string;
    transfers: Array<IMASS_TRANSFER_TRANSFERS>;
    fee: TLong;
    attachment: string;
}

export interface IDATA_PROPS extends IDEFAULT_PROPS {
    data: Array<IDATA_ENTRY>;
    fee: TLong;
}

export interface IORDER_PROPS extends IDEFAULT_PROPS {
    version?: number
    matcherPublicKey: string;
    amountAsset: string;
    priceAsset: string;
    orderType: TOrderType;
    price: TLong;
    amount: TLong;
    expiration: number;
    matcherFee: TLong;
}

export interface ICANCEL_ORDER_PROPS {
    senderPublicKey: string;
    orderId: string;
}

export interface IMASS_TRANSFER_TRANSFERS {
    recipient: string;
    amount: TLong;
}


export interface ISET_SCRIPT_PROPS extends IDEFAULT_PROPS {
    script: string;
    chainId: number;
    fee: TLong;
}

export interface ISET_ASSET_SCRIPT_PROPS extends IDEFAULT_PROPS {
    script: string;
    assetId: string;
    chainId: number;
    fee: TLong;
}

export interface ISPONSORSHIP_PROPS extends IDEFAULT_PROPS {
    assetId: string;
    minSponsoredAssetFee: TLong;
    fee: TLong;
}

export interface IEXCHANGE_PROPS extends IDEFAULT_PROPS {
    buyOrder: IORDER_PROPS;
    sellOrder: IORDER_PROPS;
    price: TLong;
    amount: TLong;
    buyMatcherFee: TLong;
    sellMatcherFee: TLong;
    fee: TLong;
}

export interface IEXCHANGE_PROPS_V2 extends IEXCHANGE_PROPS {
    version: number;
}

export interface IDATA_ENTRY {
    key: string;
    type: string;
    value: any;
}

export type TTX_NUMBER_MAP = {
    3: ISignatureGeneratorConstructor<IISSUE_PROPS>;
    4: ISignatureGeneratorConstructor<ITRANSFER_PROPS>;
    5: ISignatureGeneratorConstructor<IREISSUE_PROPS>;
    6: ISignatureGeneratorConstructor<IBURN_PROPS>;
    7: ISignatureGeneratorConstructor<ILEASE_PROPS>;
    8: ISignatureGeneratorConstructor<ILEASE_PROPS>;
    9: ISignatureGeneratorConstructor<ICANCEL_LEASING_PROPS>;
    10: ISignatureGeneratorConstructor<ICREATE_ALIAS_PROPS>;
    11: ISignatureGeneratorConstructor<IMASS_TRANSFER_PROPS>;
    12: ISignatureGeneratorConstructor<IDATA_PROPS>;
    13: ISignatureGeneratorConstructor<ISET_SCRIPT_PROPS>;
    14: ISignatureGeneratorConstructor<ISPONSORSHIP_PROPS>;
    15: ISignatureGeneratorConstructor<ISET_ASSET_SCRIPT_PROPS>;
}

export type TTX_TYPE_MAP = {
    issue: ISignatureGeneratorConstructor<IISSUE_PROPS>;
    transfer: ISignatureGeneratorConstructor<ITRANSFER_PROPS>;
    reissue: ISignatureGeneratorConstructor<IREISSUE_PROPS>;
    burn: ISignatureGeneratorConstructor<IBURN_PROPS>;
    exchange: ISignatureGeneratorConstructor<ILEASE_PROPS>;
    lease: ISignatureGeneratorConstructor<ILEASE_PROPS>;
    cancelLeasing: ISignatureGeneratorConstructor<ICANCEL_LEASING_PROPS>;
    createAlias: ISignatureGeneratorConstructor<ICREATE_ALIAS_PROPS>;
    massTransfer: ISignatureGeneratorConstructor<IMASS_TRANSFER_PROPS>;
    data: ISignatureGeneratorConstructor<IDATA_PROPS>;
    setScript: ISignatureGeneratorConstructor<ISET_SCRIPT_PROPS>;
    setAssetScript: ISignatureGeneratorConstructor<ISET_ASSET_SCRIPT_PROPS>;
    sponsorship: ISignatureGeneratorConstructor<ISPONSORSHIP_PROPS>;
}
