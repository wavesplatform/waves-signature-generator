import {
    ISSUE_V2,
    TRANSFER,
    REISSUE,
    LEASE,
    CANCEL_LEASING,
    CREATE_ALIAS,
    MASS_TRANSFER,
    DATA,
    SET_SCRIPT,
    SET_ASSET_SCRIPT,
    SPONSORSHIP,
    MAINNET_BYTE,
    TRANSACTION_TYPE_NUMBER,
    TRANSACTION_TYPE_VERSION,
    TX_NUMBER_MAP, parseReissueTx, parseDataTx
} from '../../src';
import TRANSACTIONS_DATA from './transactionsData';
import { BigNumber } from '@waves/data-entities';
import {
    parseIssueTx,
    parseLeaseTx,
    parseTransferTx,
    parseCancelLeaseTx,
    parseCreateAliasTx,
    parseMassTransferTx,
    parseSetScriptTx,
    parseSponsorshipTx,
    parseSetAssetScriptTx,
    parseTransactionBytes
} from '../../src/parse';


describe('parse', () => {

    it('issue', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.ISSUE];

        new ISSUE_V2(data).getBytes().then(bytes => {
            expect(parseIssueTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('transfer', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.TRANSFER];

        new TRANSFER(data).getBytes().then(bytes => {
            expect(parseTransferTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('reissue', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.REISSUE];

        new REISSUE(data).getBytes().then(bytes => {
            expect(parseReissueTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('lease', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.LEASE];

        new LEASE(data).getBytes().then(bytes => {
            expect(parseLeaseTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('cancel leasing', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.CANCEL_LEASING];

        new CANCEL_LEASING(data).getBytes().then(bytes => {
            expect(parseCancelLeaseTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('alias', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.CREATE_ALIAS];

        new CREATE_ALIAS(data).getBytes().then(bytes => {
            expect(parseCreateAliasTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('mass transfer', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.MASS_TRANSFER];

        new MASS_TRANSFER(data).getBytes().then(bytes => {
            expect(parseMassTransferTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('data', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.DATA];

        new DATA(data).getBytes().then(bytes => {
            expect(parseDataTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    it('set script "true"', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.SET_SCRIPT];

        new SET_SCRIPT(data).getBytes().then(bytes => {
            expect(parseSetScriptTx(bytes)).toEqual(data);
            done();
        }).catch(done);
    });

    it('set empty script', done => {

        const data = {
            type: TRANSACTION_TYPE_NUMBER.SET_SCRIPT,
            version: TRANSACTION_TYPE_VERSION.SET_SCRIPT,
            chainId: MAINNET_BYTE,
            senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
            script: 'base64:',
            fee: new BigNumber('100000'),
            timestamp: new BigNumber(1538663245955)
        };

        new SET_SCRIPT(data).getBytes().then(bytes => {
            expect(parseSetScriptTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });
    
    it('set asset script "true"', done => {
        
        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.SET_ASSET_SCRIPT];
        
        new SET_ASSET_SCRIPT(data).getBytes().then(bytes => {
            expect(parseSetAssetScriptTx(bytes)).toEqual(data);
            done();
        }).catch(done);
    });
    
    it('set sponsorship', done => {

        const data = TRANSACTIONS_DATA[TRANSACTION_TYPE_NUMBER.SPONSORSHIP];

        new SPONSORSHIP(data).getBytes().then(bytes => {
            expect(parseSponsorshipTx(bytes)).toEqual(data);
            done();
        }).catch(done);

    });

    Object.keys(TRANSACTIONS_DATA).forEach(stringType => {
        const type = Number(stringType);
        //@ts-ignore
        const data = TRANSACTIONS_DATA[stringType];

        it(`check parseTransactionBytes with transaction type ${type}`, done => {
            //@ts-ignore
            const Generator = TX_NUMBER_MAP[type];

            //@ts-ignore
            new Generator(data).getBytes().then(bytes => {
                expect(parseTransactionBytes(bytes)).toEqual(data);
                done();
            }).catch(done);

        });
    });

    it('check parseTransactionBytes with wrong transaction type', () => {
        expect(() => parseTransactionBytes(Uint8Array.from([100, 1]))).toThrow('Type 100 is not supported!');
    });

    it('check not supported exchange transaction', () => {
        expect(() => parseTransactionBytes(Uint8Array.from([TRANSACTION_TYPE_NUMBER.EXCHANGE, 1]))).toThrow('Exchange transaction parser is not supported!');
    });
});
