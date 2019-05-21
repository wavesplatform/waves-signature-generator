import { BigNumber } from '@waves/bignumber';

export type TBuffer = Uint8Array | number[];

export interface IKeyPairBytes {
    readonly privateKey: Uint8Array;
    readonly publicKey: Uint8Array;
}

export interface IKeyPair {
    publicKey: string;
    privateKey: string;
}

export type TOrderType = 'buy' | 'sell';
export type TLong = string | BigNumber;
