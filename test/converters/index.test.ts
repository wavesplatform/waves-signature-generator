import { utils, libs } from '../../src';
import { BigNumber } from '@waves/bignumber';

const STRING = 'some where long string with !*:-( что-то';
const BYTES = Uint8Array.from([
    115, 111, 109, 101, 32, 119, 104, 101, 114, 101, 32, 108, 111, 110,
    103, 32, 115, 116, 114, 105, 110, 103, 32, 119, 105, 116, 104, 32,
    33, 42, 58, 45, 40, 32, 209, 135, 209, 130, 208, 190, 45, 209, 130,
    208, 190
]);

it('string converter', () => {

    const bytes = utils.convert.stringToByteArray(STRING);
    expect(Array.from(bytes)).toEqual(Array.from(BYTES));

});

it('byte array to string', () => {
    const string = libs.converters.byteArrayToString(BYTES);
    expect(string).toBe(STRING);
});

it('Sign Number to byte Array', () => {
    const converter = utils.convert.signLongToByteArray;
    const converter2 = (n: number) => utils.convert.longToByteArray(n, 8);
    const bytes = converter(70000);
    const bytes2 = converter2(70000);
    expect(bytes.join()).toBe(bytes2.join());

    const bytes3 = converter(-9999999999);
    expect(bytes3.join()).toBe([255, 255, 255, 253, 171, 244, 28, 1].join());
});

it('Sign BigNumber to byte Array', () => {
    const converter = utils.convert.signBigNumberToByteArray;
    const converter2 = utils.convert.bigNumberToByteArray;
    const bytes = converter(new BigNumber(70000));
    const bytes2 = converter2(new BigNumber(70000), 8);
    expect(bytes.join()).toBe(bytes2.join());

    const bytes3 = converter(new BigNumber('-9999999999'));
    expect(bytes3.join()).toBe([255, 255, 255, 253, 171, 244, 28, 1].join());
});
