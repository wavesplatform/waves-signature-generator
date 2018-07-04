import { MAINNET_BYTE, TESTNET_BYTE, Seed, config } from '../src/index';

const MAINNET = {
    PHRASE: 'boil hip drill joke ability ghost match dizzy opera interest damage cute critic happy eye',
    ADDRESS: '3P6YQqoCrvVWhHm8Gz5hEZs9reb1jvq8SFQ',
    PUBLIC_KEY: 'ChziWp2CBVfoYN1CdYzoSvQL4xMNB7mjKaXgMFrVJoPW',
    PRIVATE_KEY: '6wa1xTfbg6KeGfj3mRPAVMeTYMVghFqBvpnAwWfiQHSu'
};

const TESTNET = {
    PHRASE: 'boil hip drill joke ability ghost match dizzy opera interest damage cute critic happy eye',
    ADDRESS: '3MtXbtUJznx84qTi1uphH7VLVm5EumdpTdS',
    PUBLIC_KEY: 'ChziWp2CBVfoYN1CdYzoSvQL4xMNB7mjKaXgMFrVJoPW',
    PRIVATE_KEY: '6wa1xTfbg6KeGfj3mRPAVMeTYMVghFqBvpnAwWfiQHSu'
};

let configure: typeof TESTNET | typeof MAINNET;

describe('Seed tests', () => {
    [MAINNET_BYTE, TESTNET_BYTE].forEach((byte) => {

        describe(`Network byte is ${byte}`, () => {

            beforeEach(() => {
                configure = byte === MAINNET_BYTE ? MAINNET : TESTNET;
                config.set({ networkByte: byte });
            });

            it('get address from phrase', () => {
                const seed = new Seed(configure.PHRASE);
                expect(seed.address).toBe(configure.ADDRESS);
            });

            it('get public key from phrase', () => {
                const seed = new Seed(configure.PHRASE);
                expect(seed.keyPair.publicKey).toBe(configure.PUBLIC_KEY);
            });

            it('get private key from phrase', () => {
                const seed = new Seed(configure.PHRASE);
                expect(seed.keyPair.privateKey).toBe(configure.PRIVATE_KEY);
            });
        });

    });
});
