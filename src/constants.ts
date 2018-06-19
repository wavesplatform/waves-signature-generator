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
    MASS_TRANSFER = 11,
    DATA = 12,
    SET_SCRIPT = 13
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
    MASS_TRANSFER = 'massTransfer',
    DATA = 'data',
    SET_SCRIPT = 'setScript'
}

export const WAVES_ID = 'WAVES';
export const WAVES_BLOCKCHAIN_ID = '';

export const MAINNET_BYTE: number = 'W'.charCodeAt(0);
export const TESTNET_BYTE: number = 'T'.charCodeAt(0);

export const ADDRESS_VERSION: number = 1;
export const ALIAS_VERSION: number = 2;

export const TRANSFER_ATTACHMENT_BYTE_LIMIT: number = 140;
export const DATA_ENTRIES_BYTE_LIMIT: number = 135 * 1024; // 140 kb for whole tx // TODO : make it strict!

export const INITIAL_NONCE: number = 0;
export const PRIVATE_KEY_LENGTH: number = 32;
export const PUBLIC_KEY_LENGTH: number = 32;

export const ISSUE_TX_VERSION = 2;
export const TRANSFER_TX_VERSION = 2;
export const REISSUE_TX_VERSION = 2;
export const BURN_TX_VERSION = 2;
export const EXCHANGE_TX_VERSION = 2;
export const LEASE_TX_VERSION = 2;
export const CANCEL_LEASING_TX_VERSION = 2;
export const CREATE_ALIAS_TX_VERSION = 2;
export const MASS_TRANSFER_TX_VERSION = 1;
export const DATA_TX_VERSION = 1;
export const SET_SCRIPT_TX_VERSION = 1;

// That is to mark ByteProcessor instances which cannot be affected by user
export const STUB_NAME = 'reservedName';
