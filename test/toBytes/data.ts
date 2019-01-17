import {
    IBURN_PROPS,
    ICANCEL_LEASING_PROPS,
    IEXCHANGE_PROPS,
    IEXCHANGE_PROPS_V2,
    IISSUE_PROPS,
    ILEASE_PROPS,
    IORDER_PROPS,
    IREISSUE_PROPS,
    ISET_ASSET_SCRIPT_PROPS,
    ISET_SCRIPT_PROPS,
    ISPONSORSHIP_PROPS,
    ITRANSFER_PROPS,
    TRANSACTION_TYPE_NUMBER
} from '../../src';
import { BigNumber } from '@waves/data-entities';

export type T_TRANSACTION_PROPS = IISSUE_PROPS |
    ITRANSFER_PROPS |
    IEXCHANGE_PROPS |
    IEXCHANGE_PROPS_V2 |
    IORDER_PROPS |
    IREISSUE_PROPS |
    IBURN_PROPS |
    ILEASE_PROPS |
    ICANCEL_LEASING_PROPS |
    ISET_ASSET_SCRIPT_PROPS |
    ISET_SCRIPT_PROPS |
    ISPONSORSHIP_PROPS

export const TEST_DATA: Array<{ data: T_TRANSACTION_PROPS; type: TRANSACTION_TYPE_NUMBER, bytes: Uint8Array }> = [
    {
        data: {
            senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
            fee: new BigNumber(100000),
            timestamp: new BigNumber(1547555878561),
            version: 2,
            recipient: '3PAs2qSeUAfgqSKS8LpZPKGYEjJKcud9Djr',
            assetId: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS',
            feeAssetId: 'WAVES',
            amount: new BigNumber(200000),
            attachment: 'Kq9Fxqv1fSnyf2kZkdn',
        },
        type: TRANSACTION_TYPE_NUMBER.TRANSFER,
        bytes: Uint8Array.from([4, 2, 19, 252, 132, 31, 108, 218, 109, 24, 75, 198, 202, 86, 159, 217, 210,
            255, 88, 88, 90, 106, 253, 69, 144, 38, 209, 216, 59, 162, 141, 206, 251, 97, 1, 108, 250, 106, 255,
            197, 237, 170, 140, 11, 127, 181, 42, 147, 210, 162, 12, 47, 130, 130, 219, 116, 122, 4, 140, 83, 251,
            253, 19, 31, 115, 160, 255, 0, 0, 0, 1, 104, 81, 132, 182, 161, 0, 0, 0, 0, 0, 3, 13, 64, 0, 0, 0, 0, 0,
            1, 134, 160, 1, 87, 97, 254, 60, 70, 209, 13, 112, 117, 56, 38, 78, 107, 37, 199, 141, 222, 157, 134, 75,
            180, 68, 110, 124, 37, 0, 19, 75, 113, 57, 70, 120, 113, 118, 49, 102, 83, 110, 121, 102, 50, 107, 90, 107, 100, 110,
        ])
    },
    {
        data: {
            senderPublicKey: '7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy',
            fee: new BigNumber(300000),
            timestamp: new BigNumber(1547654553411),
            version: 2,
            buyOrder: {
                sender: '3PCAB4sHXgvtu5NPoen6EXR5yaNbvsEA8Fj',
                senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
                matcherPublicKey: '7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy',
                amountAsset: '6XJAscmejGPTLAdKsg12MynB5rNQzNiZz8Yj81SWeFrj',
                priceAsset: 'WAVES',
                orderType: 'buy',
                amount: new BigNumber(100),
                price: new BigNumber(900000000000),
                timestamp: new BigNumber(1547658584322),
                expiration: 1550164184322,
                matcherFee: new BigNumber(300000),
                signature : "wBTgPYwgibq4JEJ3aDjZ882ByMGmapJbHVuzNe4LmPKp5dzZQNKwTzLPMB3VHbJhCmPVYHWPsp8AYMzhMnp4gPC"
            },
            sellOrder: {
                senderPublicKey: '3pu3Nn1NLtvyUntiwGRova6RGGvGLg6gKJ9C8KSviKvn',
                matcherPublicKey: '7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy',
                amountAsset: '6XJAscmejGPTLAdKsg12MynB5rNQzNiZz8Yj81SWeFrj',
                priceAsset: 'WAVES',
                orderType: 'sell',
                amount: new BigNumber(10000),
                price: new BigNumber(900000000000),
                timestamp: new BigNumber(1547634991954),
                expiration: 1550140591954,
                matcherFee: new BigNumber(300000),
                signature : "2VtVCatw76dj62HExRsTzjkTRf677rUDmNTcL2m9zSCYPDJwM24uoKgKUc7qoHbB2LHGMKTdid7X5wAYwqwyWuuj"
            },
            amount: new BigNumber(100),
            price: new BigNumber(900000000000),
            buyMatcherFee: new BigNumber(300000),
            sellMatcherFee: new BigNumber(3000)
        },
        type: TRANSACTION_TYPE_NUMBER.EXCHANGE,
        bytes: Uint8Array.from([0, 7, 2, 0, 0, 0, 203, 1, 19, 252, 132, 31, 108, 218, 109, 24, 75, 198, 202,
            86, 159, 217, 210, 255, 88, 88, 90, 106, 253, 69, 144, 38, 209, 216, 59, 162, 141, 206, 251, 97, 100, 67,
            66, 229, 220, 167, 247, 104, 120, 126, 0, 88, 2, 74, 88, 11, 204, 242, 151, 223, 79, 118, 68, 41, 219, 211,
            62, 165, 189, 241, 223, 2, 1, 82, 13, 69, 249, 30, 239, 157, 14, 130, 125, 34, 132, 131, 50, 70, 189, 181,
            157, 10, 232, 111, 87, 204, 108, 29, 5, 196, 237, 19, 249, 95, 244, 0, 0, 0, 0, 0, 209, 140, 46, 40, 0, 0,
            0, 0, 0, 0, 0, 0, 100, 0, 0, 1, 104, 87, 163, 225, 2, 0, 0, 1, 104, 236, 252, 77, 2, 0, 0, 0, 0, 0, 4, 147,
            224, 46, 185, 27, 71, 246, 150, 78, 175, 212, 117, 46, 1, 153, 197, 47, 195, 93, 224, 251, 240, 26, 187, 76,
            69, 171, 52, 254, 48, 2, 234, 105, 171, 121, 116, 153, 254, 40, 197, 53, 26, 71, 85, 67, 191, 131, 240, 209,
            215, 181, 26, 224, 150, 62, 11, 210, 144, 205, 246, 170, 79, 183, 47, 189, 11, 0, 0, 0, 203, 1, 41, 252,
            131, 200, 88, 76, 186, 49, 145, 63, 116, 114, 207, 181, 123, 87, 246, 157, 41, 247, 21, 201, 138, 27, 251,
            98, 150, 101, 193, 165, 179, 15, 100, 67, 66, 229, 220, 167, 247, 104, 120, 126, 0, 88, 2, 74, 88, 11, 204,
            242, 151, 223, 79, 118, 68, 41, 219, 211, 62, 165, 189, 241, 223, 2, 1, 82, 13, 69, 249, 30, 239, 157, 14,
            130, 125, 34, 132, 131, 50, 70, 189, 181, 157, 10, 232, 111, 87, 204, 108, 29, 5, 196, 237, 19, 249, 95,
            244, 0, 1, 0, 0, 0, 209, 140, 46, 40, 0, 0, 0, 0, 0, 0, 0, 39, 16, 0, 0, 1, 104, 86, 59, 227, 82, 0, 0, 1,
            104, 235, 148, 79, 82, 0, 0, 0, 0, 0, 4, 147, 224, 74, 237, 187, 230, 223, 63, 114, 157, 160, 84, 4, 213,
            28, 251, 254, 151, 112, 94, 181, 28, 149, 34, 253, 209, 43, 123, 118, 130, 128, 65, 153, 5, 161, 98, 244,
            160, 250, 61, 177, 111, 98, 237, 225, 196, 183, 131, 204, 23, 73, 178, 149, 92, 32, 243, 72, 244, 44, 138,
            171, 78, 115, 95, 125, 10, 0, 0, 0, 209, 140, 46, 40, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 4, 147,
            224, 0, 0, 0, 0, 0, 0, 11, 184, 0, 0, 0, 0, 0, 4, 147, 224, 0, 0, 1, 104, 87, 102, 95, 67
        ])
    }
];
