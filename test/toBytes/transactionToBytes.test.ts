import { TEST_TRANSACTIONS_DATA } from './data';
import { BYTES_GENERATORS_MAP } from '../../src';


const last = <T>(list: Array<T>): T => list[list.length - 1];

describe('Transaction to bytes', () => {

    TEST_TRANSACTIONS_DATA.forEach(item => {

        it(`Transaction type ${item.type} to bytes`, done => {

            const versionMap = BYTES_GENERATORS_MAP[item.type];
            const lastVersion = last(Object.keys(versionMap).map(Number).sort());
            const version = 'version' in item.data ? item.data.version : lastVersion;

            // new versionMap[version as any](item.data).getDebugBytes().then(console.log);
            new versionMap[version as any](item.data).getBytes().then(bytes => {
                expect(bytes).toEqual(item.bytes);
                done();
            });
        });
    });

});
