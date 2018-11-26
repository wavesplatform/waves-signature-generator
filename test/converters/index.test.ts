import { utils, libs } from '../../src';

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
