export * from './constants';
export * from './byteProcessor/ByteProcessor';
export * from './config/Config';
export * from './config/interface';
export * from './signatureFactory/interface';
export * from './signatureFactory/SignatureFactory';
import * as concatModule from './utils/concat';
import * as cryptoModule from './utils/crypto';
import * as convertModule from './libs/converters';
import * as base58Module from './libs/base58';

export const concat = {
    ...concatModule
};
export const crypto = {
    ...cryptoModule
};
export const convert = {
    ...convertModule
};
export const base58 = {
    ...base58Module
};
