import BigNumber from 'bignumber.js';
import * as base64 from 'base64-js';
import base58 from '../libs/base58';
import convert from '../utils/convert';
import { concatUint8Arrays } from '../utils/concat';
import { DATA_ENTRIES_BYTE_LIMIT, STUB_NAME } from '../constants';
import { config } from '..';
import { ALIAS_VERSION, TRANSFER_ATTACHMENT_BYTE_LIMIT, WAVES_BLOCKCHAIN_ID, WAVES_ID } from '../constants';


// NOTE : Waves asset ID in blockchain transactions equals to an empty string
function blockchainifyAssetId(assetId: string): string {
    if (!assetId) throw new Error('Asset ID should not be empty');
    return assetId === WAVES_ID ? WAVES_BLOCKCHAIN_ID : assetId;
}

function getAliasBytes(alias: string): number[] {
    const aliasBytes = convert.stringToByteArrayWithSize(alias);
    return [ALIAS_VERSION, config.getNetworkByte(), ...aliasBytes];
}

// ABSTRACT PARENT

export abstract class ByteProcessor {

    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public abstract process(value: any): Promise<Uint8Array>
}

// SIMPLE

export class Base58 extends ByteProcessor {
    public process(value: string) {
        const bytes = base58.decode(value);
        return Promise.resolve(bytes);
    }
}

export class Base64 extends ByteProcessor {
    public process(value: string) {
        if (typeof value !== 'string') throw new Error('You should pass a string to BinaryDataEntry constructor');
        if (value.slice(0, 7) !== 'base64:') throw new Error('Blob should be encoded in base64 and prefixed with "base64:"');
        const b64 = value.slice(7); // Getting the string payload
        const bytes = Uint8Array.from(base64.toByteArray(b64));
        const lengthBytes = Uint8Array.from(convert.shortToByteArray(bytes.length));
        return Promise.resolve(concatUint8Arrays(lengthBytes, bytes));
    }
}

export class Bool extends ByteProcessor {
    public process(value: boolean) {
        const bytes = convert.booleanToBytes(value);
        return Promise.resolve(Uint8Array.from(bytes));
    }
}

export class Byte extends ByteProcessor {
    public process(value: number) {
        if (typeof value !== 'number') throw new Error('You should pass a number to Byte constructor');
        if (value < 0 || value > 255) throw new Error('Byte value must fit between 0 and 255');
        return Promise.resolve(Uint8Array.from([value]));
    }
}

export class Long extends ByteProcessor {
    public process(value: number | string | BigNumber) {
        let bytes;
        if (typeof value === 'number') {
            bytes = convert.longToByteArray(value);
        } else {
            if (typeof value === 'string') {
                value = new BigNumber(value);
            }
            bytes = convert.bigNumberToByteArray(value);
        }
        return Promise.resolve(Uint8Array.from(bytes));
    }
}

export class Short extends ByteProcessor {
    public process(value: number) {
        if (typeof value !== 'number') throw new Error('You should pass a number to Short constructor');
        if (value < 0 || value > 65535) throw new Error('Short value must fit between 0 and 65535');
        return Promise.resolve(Uint8Array.from(convert.shortToByteArray(value)));
    }
}

export class StringWithLength extends ByteProcessor {
    public process(value: string) {
        const bytesWithLength = convert.stringToByteArrayWithSize(value);
        return Promise.resolve(Uint8Array.from(bytesWithLength));
    }
}

// COMPLEX

export class Alias extends ByteProcessor {
    public process(value: string) {
        const aliasBytes = getAliasBytes(value);
        const aliasBytesWithLength = convert.bytesToByteArrayWithSize(aliasBytes);
        return Promise.resolve(Uint8Array.from(aliasBytesWithLength));
    }
}

export class AssetId extends ByteProcessor {
    public process(value: string) {
        value = blockchainifyAssetId(value);
        // We must pass bytes of `[0]` for Waves asset ID and bytes of `[1] + assetId` for other asset IDs
        const bytes = value ? concatUint8Arrays(Uint8Array.from([1]), base58.decode(value)) : Uint8Array.from([0]);
        return Promise.resolve(bytes);
    }
}

export class Attachment extends ByteProcessor {
    public process(value: Uint8Array | string) {

        if (typeof value === 'string') {
            value = Uint8Array.from(convert.stringToByteArray(value));
        }

        if (value.length > TRANSFER_ATTACHMENT_BYTE_LIMIT) {
            throw new Error('Maximum attachment length is exceeded');
        }

        const valueWithLength = convert.bytesToByteArrayWithSize(value);
        return Promise.resolve(Uint8Array.from(valueWithLength));

    }
}

export class MandatoryAssetId extends ByteProcessor {
    public process(value: string) {
        value = blockchainifyAssetId(value);
        return Promise.resolve(base58.decode(value));
    }
}

export class OrderType extends ByteProcessor {
    public process(value: string) {
        if (value === 'buy') {
            return Bool.prototype.process.call(this, false);
        } else if (value === 'sell') {
            return Bool.prototype.process.call(this, true);
        } else {
            throw new Error('There are no other order types besides "buy" and "sell"');
        }
    }
}

export class Recipient extends ByteProcessor {
    public process(value: string) {
        if (value.length <= 30) {
            const aliasBytes = getAliasBytes(value);
            return Promise.resolve(Uint8Array.from(aliasBytes));
        } else {
            const addressBytes = base58.decode(value);
            return Promise.resolve(Uint8Array.from(addressBytes));
        }
    }
}

export class Transfers extends ByteProcessor {
    public process(values) {
        const recipientProcessor = new Recipient(STUB_NAME);
        const amountProcessor = new Long(STUB_NAME);

        const promises = [];
        for (let i = 0; i < values.length; i++) {
            promises.push(recipientProcessor.process(values[i].recipient));
            promises.push(amountProcessor.process(values[i].amount));
        }

        return Promise.all(promises).then((elements) => {
            const length = convert.shortToByteArray(values.length);
            const lengthBytes = Uint8Array.from(length);
            return concatUint8Arrays(lengthBytes, ...elements);
        });
    }
}

// DATA TRANSACTIONS ONLY

const INTEGER_DATA_TYPE = 0;
const BOOLEAN_DATA_TYPE = 1;
const BINARY_DATA_TYPE = 2;
const STRING_DATA_TYPE = 3;

export class IntegerDataEntry extends ByteProcessor {
    public process(value: number | string | BigNumber) {
        return Long.prototype.process.call(this, value).then((longBytes) => {
            const typeByte = Uint8Array.from([INTEGER_DATA_TYPE]);
            return concatUint8Arrays(typeByte, longBytes);
        });
    }
}

export class BooleanDataEntry extends ByteProcessor {
    public process(value: boolean) {
        return Bool.prototype.process.call(this, value).then((boolByte) => {
            const typeByte = Uint8Array.from([BOOLEAN_DATA_TYPE]);
            return concatUint8Arrays(typeByte, boolByte);
        });
    }
}

export class BinaryDataEntry extends ByteProcessor {
    public process(value: string) {
        return Base64.prototype.process.call(this, value).then((binaryBytes) => {
            const typeByte = Uint8Array.from([BINARY_DATA_TYPE]);
            return Promise.resolve(concatUint8Arrays(typeByte, binaryBytes));
        });
    }
}

export class StringDataEntry extends ByteProcessor {
    public process(value: string) {
        return StringWithLength.prototype.process.call(this, value).then((stringBytes) => {
            const typeByte = Uint8Array.from([STRING_DATA_TYPE]);
            return concatUint8Arrays(typeByte, stringBytes);
        });
    }
}

export class DataEntries extends ByteProcessor {
    public process(entries: any[]) {
        const lengthBytes = Uint8Array.from(convert.shortToByteArray(entries.length));
        if (entries.length) {
            return Promise.all(entries.map((entry) => {
                const prependKeyBytes = (valueBytes) => {
                    return StringWithLength.prototype.process.call(this, entry.key).then((keyBytes) => {
                        return concatUint8Arrays(keyBytes, valueBytes);
                    });
                };

                switch (entry.type) {
                    case 'integer':
                        return IntegerDataEntry.prototype.process.call(this, entry.value).then(prependKeyBytes);
                    case 'boolean':
                        return BooleanDataEntry.prototype.process.call(this, entry.value).then(prependKeyBytes);
                    case 'binary':
                        return BinaryDataEntry.prototype.process.call(this, entry.value).then(prependKeyBytes);
                    case 'string':
                        return StringDataEntry.prototype.process.call(this, entry.value).then(prependKeyBytes);
                    default:
                        throw new Error(`There is no data type "${entry.type}"`);
                }
            })).then((entriesBytes) => {
                const bytes = concatUint8Arrays(lengthBytes, ...entriesBytes);
                if (bytes.length > DATA_ENTRIES_BYTE_LIMIT) throw new Error('Data transaction is too large (140KB max)');
                return bytes;
            });
        } else {
            return Promise.resolve(Uint8Array.from([0, 0]));
        }
    }
}
