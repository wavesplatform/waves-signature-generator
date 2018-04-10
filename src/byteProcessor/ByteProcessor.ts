import base58 from '../libs/base58';
import convert from '../utils/convert';
import { concatUint8Arrays } from '../utils/concat';
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
    public process(value: number) {
        const bytes = convert.longToByteArray(value);
        return Promise.resolve(Uint8Array.from(bytes));
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

