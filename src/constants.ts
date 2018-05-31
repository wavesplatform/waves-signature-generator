export const enum TRANSACTION_TYPE_NUMBER {
    SEND_OLD = 2,
    ISSUE = 3,
    TRANSFER = 4,
    REISSUE = 5,
    BURN = 6,
    EXCHANGE = 7,
    LEASE = 8,
    CANCEL_LEASING = 9,
    CREATE_ALIAS = 10,
    MASS_TRANSFER = 11
}

export const enum TRANSACTION_TYPE {
    ISSUE = 'issue',
    TRANSFER = 'transfer',
    REISSUE = 'reissue',
    BURN = 'burn',
    EXCHANGE = 'exchange',
    LEASE = 'lease',
    CANCEL_LEASING = 'cancelLeasing',
    CREATE_ALIAS = 'createAlias',
    MASS_TRANSFER = 'massTransfer'
}

export const WAVES_ID = 'WAVES';
export const WAVES_BLOCKCHAIN_ID = '';

export const MAINNET_BYTE: number = 'W'.charCodeAt(0);
export const TESTNET_BYTE: number = 'T'.charCodeAt(0);

export const ADDRESS_VERSION: number = 1;
export const ALIAS_VERSION: number = 2;

export const TRANSFER_ATTACHMENT_BYTE_LIMIT: number = 140;

export const INITIAL_NONCE: number = 0;
export const PRIVATE_KEY_LENGTH: number = 32;
export const PUBLIC_KEY_LENGTH: number = 32;

export const MASS_TRANSFER_TX_VERSION = 1;
