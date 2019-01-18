declare let exports: any;
declare let module: any;
declare let require: any;

declare const Buffer: any;

//@ts-ignore
function nodeRandom(count, options) {
    const crypto = require('crypto');
    const buf = crypto.randomBytes(count);

    switch (options.type) {
        case 'Array':
            return [].slice.call(buf);
        case 'Buffer':
            return buf;
        case 'Uint8Array':
            const arr = new Uint8Array(count);
            for (let i = 0; i < count; ++i) {
                arr[i] = buf.readUInt8(i);
            }
            return arr;
        default:
            throw new Error(options.type + ' is unsupported.');
    }
}

//@ts-ignore
function browserRandom(count, options) {
    const nativeArr = new Uint8Array(count);
    const crypto = self.crypto || (self as any).msCrypto;
    crypto.getRandomValues(nativeArr);

    switch (options.type) {
        case 'Array':
            return [].slice.call(nativeArr);
        case 'Buffer':
            try {
                //@ts-ignore
                const b = new Buffer(1);
            } catch (e) {
                throw new Error('Buffer not supported in this environment. Use Node.js or Browserify for browser support.');
            }
            return new Buffer(nativeArr);
        case 'Uint8Array':
            return nativeArr;
        default:
            throw new Error(options.type + ' is unsupported.');
    }
}

//@ts-ignore
function secureRandom(count, options) {

    options = options || { type: 'Array' };

    if (typeof window !== 'undefined' || typeof self !== 'undefined') {
        return browserRandom(count, options);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        return nodeRandom(count, options);
    } else {
        throw new Error('Your environment is not defined');
    }

}


export default {

    secureRandom: secureRandom,

    //@ts-ignore
    randomArray(byteCount) {
        return secureRandom(byteCount, { type: 'Array' });
    },

    //@ts-ignore
    randomUint8Array(byteCount) {
        return secureRandom(byteCount, { type: 'Uint8Array' });
    },

    //@ts-ignore
    randomBuffer(byteCount) {
        return secureRandom(byteCount, { type: 'Buffer' });
    }

};
