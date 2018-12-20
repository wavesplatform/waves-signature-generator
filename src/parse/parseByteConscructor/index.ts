import converters from '../../libs/converters';
import base58 from '../../libs/base58';
import { fromByteArray } from 'base64-js';
import { ALIAS_VERSION, DATA_TRANSACTION_FIELD_TYPES } from '../../constants';


const LENGTH_SIZE = 2;
const LONG_BYTES_SIZE = 8;

const getDataTxFieldTypeByCode = fieldTypeCode => {
    switch (fieldTypeCode) {
        case DATA_TRANSACTION_FIELD_TYPES.INTEGER:
            return 'integer';
        case DATA_TRANSACTION_FIELD_TYPES.BOOLEAN:
            return 'boolean';
        case DATA_TRANSACTION_FIELD_TYPES.BINARY:
            return 'binary';
        case DATA_TRANSACTION_FIELD_TYPES.STRING:
            return 'string';
        default:
            throw new Error(`Unknown data field code ${fieldTypeCode}!`);
    }
};

const addAccValue = (name: string, processor: IByteParser<any>) => (acc, bytes) => {
    if (!acc.data) {
        acc.data = Object.create(null);
    }
    acc.data[name] = wrap(processor)(acc, bytes);
    return acc;
};

const moveCursor = (acc, shift) => {
    if (!acc.cursor) {
        acc.cursor = 0;
    }
    acc.cursor += shift;
    return acc;
};

const wrap = processor => (acc, bytes) => {
    const start = acc.cursor || 0;
    const { shift, value } = processor(bytes, start);
    moveCursor(acc, shift);
    return value;
};


const byteToBigNumber = shift => (bytes, start) => {
    const value = converters.byteArrayToBigInteger(bytes.slice(start, start + shift));
    return { value, shift };
};

const byteToSignBigNumber = shift => (bytes, start) => {
    const value = converters.byteArrayToSignBigInteger(bytes.slice(start, start + shift));
    return { value, shift };
};

const byteToNumber = shift => (bytes, start) => {
    const result = byteToBigNumber(shift)(bytes, start);
    return { shift, value: result.value.toNumber() };
};

const byteToBoolean = (bytes, start) => {
    const value = !!bytes[start];
    return { value, shift: 1 };
};

const byteToString = shift => (bytes, start) => {
    const value = converters.byteArrayToString(bytes.slice(start, start + shift));
    return { shift, value };
};

const byteToStringWithLength = (bytes, start) => {
    const lengthInfo = byteToNumber(LENGTH_SIZE)(bytes, start);
    const { value } = byteToString(lengthInfo.value)(bytes, start + LENGTH_SIZE);
    return { shift: lengthInfo.value + LENGTH_SIZE, value };
};

const byteToBase58 = (bytes, start, length?) => { // TODO!
    const shift = length || 32;
    const value = base58.encode(bytes.slice(start, start + shift));
    return { value, shift };
};

const byteToAssetId = (bytes, start) => {
    const shift = 33;
    const isWaves = !bytes[start];
    if (isWaves) {
        return { shift: 1, value: 'WAVES' };
    }
    const { value } = byteToBase58(bytes, start + 1);
    return { shift, value };
};

const byteToAddressOrAlias = (bytes, start) => {
    if (bytes[start] === ALIAS_VERSION) {
        const aliasData = byteToStringWithLength(bytes, start + 2);
        return { shift: aliasData.shift + 2, value: aliasData.value };
    } else {
        return byteToBase58(bytes, start, 26);
    }
};

const byteNewAliasToString = (bytes, start) => {
    const shift = byteToNumber(LENGTH_SIZE)(bytes, start).value + LENGTH_SIZE;
    const { value } = byteToStringWithLength(bytes, start + 4);
    return { shift, value };
};

const byteToTransfers = (bytes, start) => {
    const count = byteToNumber(LENGTH_SIZE)(bytes, start).value;
    const transfers = [];
    let shift = LENGTH_SIZE;

    for (let i = 0; i < count; i++) {
        const recipientData = byteToAddressOrAlias(bytes, start + shift);
        shift += recipientData.shift;
        const amountData = byteToBigNumber(LONG_BYTES_SIZE)(bytes, start + shift);
        shift += amountData.shift;

        transfers.push({
            recipient: recipientData.value,
            amount: amountData.value
        });
    }

    return { shift, value: transfers };
};

const byteToScript = (bytes, start) => {
    const VERSION_LENGTH = 1;

    if (bytes[start] === 0) {
        return { shift: VERSION_LENGTH, value: 'base64:' };
    }

    const lengthInfo = byteToNumber(LENGTH_SIZE)(bytes, start + VERSION_LENGTH);
    const from = start + VERSION_LENGTH + lengthInfo.shift;
    const to = start + VERSION_LENGTH + lengthInfo.shift + lengthInfo.value;
    const value = `base64:${fromByteArray(bytes.slice(from, to))}`;

    return { value, shift: to - start };
};

const byteToData = (bytes, start) => {
    const count = getNumberFromBytes(bytes, LENGTH_SIZE, start);
    const fields = [];
    let shift = LENGTH_SIZE;

    for (let i = 0; i < count; i++) {

        const keyLength = getNumberFromBytes(bytes, LENGTH_SIZE, start + shift);
        shift += LENGTH_SIZE;
        const key = byteToString(keyLength)(bytes, start + shift).value;
        shift += keyLength;

        const fieldTypeCode = getNumberFromBytes(bytes, 1, start + shift);
        shift += 1;
        const type = getDataTxFieldTypeByCode(fieldTypeCode);
        let value;

        switch (fieldTypeCode) {
            case DATA_TRANSACTION_FIELD_TYPES.INTEGER:
                value = byteToSignBigNumber(LONG_BYTES_SIZE)(bytes, start + shift).value;
                shift += LONG_BYTES_SIZE;
                break;
            case DATA_TRANSACTION_FIELD_TYPES.BOOLEAN:
                const booleanData = byteToBoolean(bytes, start + shift);
                value = booleanData.value;
                shift += booleanData.shift;
                break;
            case DATA_TRANSACTION_FIELD_TYPES.BINARY:
                const binaryLength = getNumberFromBytes(bytes, LENGTH_SIZE, start + shift);
                shift += LENGTH_SIZE;
                value = `base64:${fromByteArray(bytes.slice(start + shift, start + shift + binaryLength))}`;
                shift += binaryLength;
                break;
            case DATA_TRANSACTION_FIELD_TYPES.STRING:
                const length = getNumberFromBytes(bytes, LENGTH_SIZE, start + shift);
                shift += LENGTH_SIZE;
                value = byteToString(length)(bytes, start + shift).value;
                shift += length;
                break;
        }

        fields.push({ key, type, value });
    }

    return { value: fields, shift };
};

export const getNumberFromBytes = (bytes, length, start = 0) => {
    return byteToNumber(length)(bytes, start).value;
};

export function toBoolean(name: string) {
    return addAccValue(name, byteToBoolean);
}

export function toBigNumber(name) {
    return addAccValue(name, byteToBigNumber(LONG_BYTES_SIZE));
}

export function toNumber(name) {
    return addAccValue(name, byteToNumber(1));
}

export function toStringWithLength(name) {
    return addAccValue(name, byteToStringWithLength);
}

export function toBase58(name) {
    return addAccValue(name, byteToBase58);
}

export function toAssetId(name) {
    return addAccValue(name, byteToAssetId);
}

export function toAddressOrAlias(name) {
    return addAccValue(name, byteToAddressOrAlias);
}

export function toNewAlias(name) {
    return addAccValue(name, byteNewAliasToString);
}

export function toTransfers(name) {
    return addAccValue(name, byteToTransfers);
}

export function toAccountScript(name) {
    return addAccValue(name, byteToScript);
}

export function toData(name) {
    return addAccValue(name, byteToData);
}

export function parseConstructor(parts: Array<any>) {
    return bytes => parts.reduce((acc, part) => part(acc, bytes), Object.create(null)).data;
}

export interface IByteParser<T> {
    (bytes: Uint8Array, start: number): { shift: number, value: T };
}
