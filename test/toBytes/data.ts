import {
    IBURN_PROPS,
    IBURN_PROPS_V2,
    ICANCEL_LEASING_PROPS,
    ICANCEL_LEASING_PROPS_V2,
    ICREATE_ALIAS_PROPS,
    IDATA_PROPS,
    IEXCHANGE_PROPS,
    IEXCHANGE_PROPS_V2,
    IISSUE_PROPS,
    ILEASE_PROPS,
    IMASS_TRANSFER_PROPS,
    IORDER_PROPS,
    IREISSUE_PROPS,
    ISET_ASSET_SCRIPT_PROPS,
    ISET_SCRIPT_PROPS,
    ISPONSORSHIP_PROPS,
    ITRANSFER_PROPS,
    MAINNET_BYTE,
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
    ICREATE_ALIAS_PROPS |
    IMASS_TRANSFER_PROPS |
    IDATA_PROPS |
    ISET_ASSET_SCRIPT_PROPS |
    ISET_SCRIPT_PROPS |
    ISPONSORSHIP_PROPS

export const TEST_TRANSACTIONS_DATA: Array<{ data: T_TRANSACTION_PROPS; type: TRANSACTION_TYPE_NUMBER, bytes: Uint8Array }> = [
    {
        data: {
            version: 1,
            senderPublicKey: 'BJ3Q8kNPByCWHwJ3RLn55UPzUDVgnh64EwYAU5iCj6z6',
            fee: new BigNumber(100000000),
            timestamp: 1480424130682,
            assetId: 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck',
            name: 'WUSD',
            quantity: new BigNumber(100000000000),
            reissuable: true,
            precision: 2,
            description: 'Official USD token',
            script: ''
        } as IISSUE_PROPS,
        type: TRANSACTION_TYPE_NUMBER.ISSUE,
        bytes: Uint8Array.from([
            3, 152, 242, 116, 149, 219, 83, 90, 95, 55, 8, 180, 179, 174, 99, 15, 27, 159, 122, 21, 140, 1, 6, 190, 165,
            197, 25, 145, 144, 153, 133, 211, 3, 0, 4, 87, 85, 83, 68, 0, 18, 79, 102, 102, 105, 99, 105, 97, 108, 32,
            85, 83, 68, 32, 116, 111, 107, 101, 110, 0, 0, 0, 23, 72, 118, 232, 0, 2, 1, 0, 0, 0, 0, 5, 245, 225, 0, 0,
            0, 1, 88, 176, 39, 136, 122, 0
        ])
    },
    {
        data: {
            version: 2,
            chainId: MAINNET_BYTE,
            senderPublicKey: 'BJ3Q8kNPByCWHwJ3RLn55UPzUDVgnh64EwYAU5iCj6z6',
            fee: new BigNumber(100000000),
            timestamp: 1480424130682,
            assetId: 'Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck',
            name: 'WUSD',
            quantity: new BigNumber(100000000000),
            reissuable: true,
            precision: 2,
            description: 'Official USD token',
            script: ''
        } as IISSUE_PROPS,
        type: TRANSACTION_TYPE_NUMBER.ISSUE,
        bytes: Uint8Array.from([
            3, 2, 87, 152, 242, 116, 149, 219, 83, 90, 95, 55, 8, 180, 179, 174, 99, 15, 27, 159, 122, 21, 140, 1, 6, 190, 165,
            197, 25, 145, 144, 153, 133, 211, 3, 0, 4, 87, 85, 83, 68, 0, 18, 79, 102, 102, 105, 99, 105, 97, 108, 32,
            85, 83, 68, 32, 116, 111, 107, 101, 110, 0, 0, 0, 23, 72, 118, 232, 0, 2, 1, 0, 0, 0, 0, 5, 245, 225, 0, 0,
            0, 1, 88, 176, 39, 136, 122, 0
        ])
    },
    {
        data: {
            senderPublicKey: '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr',
            fee: new BigNumber(100000),
            timestamp: new BigNumber(1547555878561),
            version: 1,
            recipient: '3PAs2qSeUAfgqSKS8LpZPKGYEjJKcud9Djr',
            assetId: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS',
            feeAssetId: 'WAVES',
            amount: new BigNumber(200000),
            attachment: 'Kq9Fxqv1fSnyf2kZkdn',
        },
        type: TRANSACTION_TYPE_NUMBER.TRANSFER,
        bytes: Uint8Array.from([4, 19, 252, 132, 31, 108, 218, 109, 24, 75, 198, 202, 86, 159, 217, 210,
            255, 88, 88, 90, 106, 253, 69, 144, 38, 209, 216, 59, 162, 141, 206, 251, 97, 1, 108, 250, 106, 255,
            197, 237, 170, 140, 11, 127, 181, 42, 147, 210, 162, 12, 47, 130, 130, 219, 116, 122, 4, 140, 83, 251,
            253, 19, 31, 115, 160, 255, 0, 0, 0, 1, 104, 81, 132, 182, 161, 0, 0, 0, 0, 0, 3, 13, 64, 0, 0, 0, 0, 0,
            1, 134, 160, 1, 87, 97, 254, 60, 70, 209, 13, 112, 117, 56, 38, 78, 107, 37, 199, 141, 222, 157, 134, 75,
            180, 68, 110, 124, 37, 0, 19, 75, 113, 57, 70, 120, 113, 118, 49, 102, 83, 110, 121, 102, 50, 107, 90, 107, 100, 110,
        ])
    },
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
            senderPublicKey: '27C8ksVhVFUXyngF1F8TfyCGLmkDMsm2QuTv4VvhBpJU',
            fee: new BigNumber(100000000),
            timestamp: 1540555014220,
            version: 1,
            assetId: 'H4r9fS7bn78CPhj7cjTYUMHz3idB2ZxRPx5HcjFRJJCX',
            quantity: new BigNumber(100000000000),
            reissuable: true
        } as IREISSUE_PROPS,
        type: TRANSACTION_TYPE_NUMBER.REISSUE,
        bytes: Uint8Array.from([5, 16, 113, 194, 191, 58, 129, 20, 158, 230, 197, 166, 98, 76, 99, 66, 135,
            118, 233, 165, 158, 26, 117, 23, 246, 57, 123, 217, 249, 243, 168, 55, 65, 238, 183, 78, 125, 131, 37,
            113, 92, 2, 220, 37, 114, 255, 123, 238, 85, 112, 109, 5, 165, 116, 176, 130, 186, 0, 239, 236, 147, 158,
            35, 64, 232, 0, 0, 0, 23, 72, 118, 232, 0, 1, 0, 0, 0, 0, 5, 245, 225, 0, 0, 0, 1, 102, 176, 60, 0, 76
        ])
    },
    {
        data: {
            senderPublicKey: '27C8ksVhVFUXyngF1F8TfyCGLmkDMsm2QuTv4VvhBpJU',
            fee: new BigNumber(100000000),
            timestamp: 1540555014220,
            version: 2,
            chainId: MAINNET_BYTE,
            assetId: 'H4r9fS7bn78CPhj7cjTYUMHz3idB2ZxRPx5HcjFRJJCX',
            quantity: new BigNumber(100000000000),
            reissuable: true
        } as IREISSUE_PROPS,
        type: TRANSACTION_TYPE_NUMBER.REISSUE,
        bytes: Uint8Array.from([5, 2, 87, 16, 113, 194, 191, 58, 129, 20, 158, 230, 197, 166, 98, 76, 99, 66, 135,
            118, 233, 165, 158, 26, 117, 23, 246, 57, 123, 217, 249, 243, 168, 55, 65, 238, 183, 78, 125, 131, 37,
            113, 92, 2, 220, 37, 114, 255, 123, 238, 85, 112, 109, 5, 165, 116, 176, 130, 186, 0, 239, 236, 147, 158,
            35, 64, 232, 0, 0, 0, 23, 72, 118, 232, 0, 1, 0, 0, 0, 0, 5, 245, 225, 0, 0, 0, 1, 102, 176, 60, 0, 76
        ])
    },

    {
        data: {
            senderPublicKey: '7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy',
            fee: new BigNumber(300000),
            timestamp: new BigNumber(1547654553411),
            version: 2,
            buyOrder: {
                version: 1,
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
                signature: 'wBTgPYwgibq4JEJ3aDjZ882ByMGmapJbHVuzNe4LmPKp5dzZQNKwTzLPMB3VHbJhCmPVYHWPsp8AYMzhMnp4gPC'
            },
            sellOrder: {
                version: 1,
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
                signature: '2VtVCatw76dj62HExRsTzjkTRf677rUDmNTcL2m9zSCYPDJwM24uoKgKUc7qoHbB2LHGMKTdid7X5wAYwqwyWuuj'
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
    },
    {
        data: {
            senderPublicKey: '7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy',
            fee: new BigNumber(300000),
            timestamp: 1547479300374,
            version: 2,
            buyOrder: {
                version: 1,
                senderPublicKey: 'CMc7mA6LADJANdKRTVpu3S1cthvKm23Lp6yGcog8SwXy',
                matcherPublicKey: '7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy',
                amountAsset: 'WAVES',
                priceAsset: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS',
                orderType: 'buy',
                amount: new BigNumber(16118000000),
                price: new BigNumber(75720),
                timestamp: 1547479275348,
                expiration: 1547536875348,
                matcherFee: new BigNumber(300000),
                signature: '4W71VoCnmLDfTnYTJd58ihuLUdUsjxSWwKFtHhxZruCdwqNDgYcdvtzYkXV74ppBnBQChA4Zgme1uWazpV8ikKfy'
            },
            sellOrder: {
                version: 2,
                senderPublicKey: 'B1hHsfxJhVZsXqUArCELhYdVpqaxtuVSuyEZMbiACkzS',
                matcherPublicKey: '7kPFrHDiGw1rCm7LPszuECwWYL3dMf6iMifLRDJQZMzy',
                amountAsset: 'WAVES',
                priceAsset: '8LQW8f7P5d5PZM7GtZEBgaqRPGSzS3DfPuiXrURJ4AJS',
                orderType: 'sell',
                amount: new BigNumber(1000000),
                price: new BigNumber(75000),
                timestamp: 1547479300134,
                expiration: 1549207300134,
                matcherFee: new BigNumber(300000),
                proofs: [
                    'pDeRsgZcgD6WFiFjuQNGozVKxrJcB4pyFS3FVtYURF338D1Ku1fvXYx5os9AffwdFDwkucuSH6bw2Xnz4iB4p7H',
                    '4Deq4Upvcq8K7inXNBQ9vDYCkca9gcpSXRpdymCa82WbxPaPNqXrqAwhToJE52rER1HfKRXdY1yXC6XC2mMEjvHQ'
                ]
            },
            amount: new BigNumber(999736),
            price: new BigNumber(75720),
            buyMatcherFee: new BigNumber(18),
            sellMatcherFee: new BigNumber(299920)
        } as IEXCHANGE_PROPS_V2,
        type: TRANSACTION_TYPE_NUMBER.EXCHANGE,
        bytes: Uint8Array.from([0, 7, 2, 0, 0, 0, 203, 1, 168, 183, 224, 249, 157, 2, 137, 204, 172, 6, 129,
            72, 196, 215, 10, 104, 140, 216, 135, 75, 80, 161, 155, 206, 33, 202, 38, 59, 160, 187, 171, 84, 100, 67,
            66, 229, 220, 167, 247, 104, 120, 126, 0, 88, 2, 74, 88, 11, 204, 242, 151, 223, 79, 118, 68, 41, 219, 211,
            62, 165, 189, 241, 223, 2, 0, 1, 108, 250, 106, 255, 197, 237, 170, 140, 11, 127, 181, 42, 147, 210, 162,
            12, 47, 130, 130, 219, 116, 122, 4, 140, 83, 251, 253, 19, 31, 115, 160, 255, 0, 0, 0, 0, 0, 0, 1, 39, 200,
            0, 0, 0, 3, 192, 181, 41, 128, 0, 0, 1, 104, 76, 243, 215, 84, 0, 0, 1, 104, 80, 98, 191, 84, 0, 0, 0, 0, 0,
            4, 147, 224, 175, 38, 25, 209, 250, 76, 230, 153, 140, 75, 95, 121, 138, 166, 204, 167, 242, 74, 191, 123,
            247, 210, 20, 53, 43, 80, 115, 206, 42, 29, 159, 150, 195, 8, 23, 11, 77, 178, 110, 140, 46, 36, 226, 178,
            22, 142, 139, 136, 200, 155, 163, 248, 38, 89, 206, 77, 221, 116, 82, 76, 190, 44, 140, 132, 0, 0, 1, 19, 2,
            2, 148, 194, 109, 37, 198, 14, 149, 239, 160, 109, 240, 59, 24, 56, 203, 180, 71, 19, 126, 141, 102, 175,
            137, 142, 104, 111, 3, 237, 135, 24, 246, 119, 100, 67, 66, 229, 220, 167, 247, 104, 120, 126, 0, 88, 2, 74,
            88, 11, 204, 242, 151, 223, 79, 118, 68, 41, 219, 211, 62, 165, 189, 241, 223, 2, 0, 1, 108, 250, 106, 255,
            197, 237, 170, 140, 11, 127, 181, 42, 147, 210, 162, 12, 47, 130, 130, 219, 116, 122, 4, 140, 83, 251, 253,
            19, 31, 115, 160, 255, 1, 0, 0, 0, 0, 0, 1, 36, 248, 0, 0, 0, 0, 0, 15, 66, 64, 0, 0, 1, 104, 76, 244, 56,
            38, 0, 0, 1, 104, 179, 243, 104, 38, 0, 0, 0, 0, 0, 4, 147, 224, 1, 0, 2, 0, 64, 40, 184, 18, 99, 1, 140,
            20, 5, 63, 84, 87, 101, 204, 86, 236, 13, 200, 225, 23, 167, 183, 96, 230, 129, 144, 145, 205, 104, 22, 125,
            26, 95, 217, 221, 130, 243, 185, 89, 142, 243, 222, 218, 35, 229, 173, 197, 90, 189, 239, 5, 99, 168, 167,
            118, 141, 13, 122, 115, 146, 193, 115, 77, 137, 0, 0, 64, 160, 246, 55, 177, 253, 14, 147, 145, 52, 85, 146,
            121, 205, 133, 2, 60, 56, 175, 109, 43, 13, 242, 182, 91, 93, 57, 244, 99, 71, 128, 213, 185, 59, 192, 105,
            215, 243, 129, 39, 229, 120, 64, 76, 222, 209, 97, 38, 198, 204, 237, 247, 68, 20, 13, 233, 206, 68, 196,
            111, 121, 213, 192, 129, 139, 0, 0, 0, 0, 0, 1, 39, 200, 0, 0, 0, 0, 0, 15, 65, 56, 0, 0, 0, 0, 0, 0, 0, 18,
            0, 0, 0, 0, 0, 4, 147, 144, 0, 0, 0, 0, 0, 4, 147, 224, 0, 0, 1, 104, 76, 244, 57, 22
        ])
    },
    {
        data: {
            senderPublicKey: 'EhuzuzEWHhZGo1th6YGy34AecoRP4sVi863xXCQUmgUT',
            fee: new BigNumber(100000),
            timestamp: 1528814759445,
            version: 1,
            assetId: '56w2Jbj8MGKwSWyTXvCzkqKKHiyX7C2zrgCQb2CEwM52',
            quantity: new BigNumber(10000000000),
        } as IBURN_PROPS_V2,
        type: TRANSACTION_TYPE_NUMBER.BURN,
        bytes: Uint8Array.from([6, 203, 163, 22, 135, 237, 134, 116, 94, 1, 135, 19, 238, 100, 196, 40, 36,
            139, 49, 8, 27, 231, 63, 242, 33, 246, 121, 125, 33, 38, 255, 158, 100, 60, 243, 188, 51, 40, 50, 171, 127,
            250, 21, 177, 193, 184, 177, 138, 23, 92, 24, 210, 68, 71, 245, 101, 191, 92, 144, 53, 107, 150, 174, 248,
            25, 0, 0, 0, 2, 84, 11, 228, 0, 0, 0, 0, 0, 0, 1, 134, 160, 0, 0, 1, 99, 244, 117, 238, 21])
    },
    {
        data: {
            senderPublicKey: '27C8ksVhVFUXyngF1F8TfyCGLmkDMsm2QuTv4VvhBpJU',
            fee: new BigNumber(100000),
            timestamp: 1543422169742,
            chainId: MAINNET_BYTE,
            version: 2,
            assetId: 'DsMgnQwqwr9JVg24BRk8gQ8Z64zKdjPhn1uHRPVmLpD5',
            quantity: new BigNumber(100000000),
        } as IBURN_PROPS_V2,
        type: TRANSACTION_TYPE_NUMBER.BURN,
        bytes: Uint8Array.from([6, 2, 87, 16, 113, 194, 191, 58, 129, 20, 158, 230, 197, 166, 98, 76, 99, 66,
            135, 118, 233, 165, 158, 26, 117, 23, 246, 57, 123, 217, 249, 243, 168, 55, 65, 191, 50, 172, 87, 73, 99,
            86, 183, 177, 108, 174, 101, 100, 120, 181, 252, 89, 91, 74, 253, 195, 254, 165, 235, 59, 193, 248, 101,
            152, 81, 127, 16, 0, 0, 0, 0, 5, 245, 225, 0, 0, 0, 0, 0, 0, 1, 134, 160, 0, 0, 1, 103, 91, 33, 82, 142
        ])
    },
    {
        data: {
            senderPublicKey: "b8AB1PQWE7kH55cS48uDTV5fezrAyDTCf7iePyXNzNm",
            fee:  new BigNumber(100000),
            timestamp: 1528813353617,
            version: 1,
            amount:  new BigNumber(500000000),
            recipient: "3P2HNUd5VUPLMQkJmctTPEeeHumiPN2GkTb"
        } as ILEASE_PROPS,
        type: TRANSACTION_TYPE_NUMBER.LEASE,
        bytes: Uint8Array.from([ 8, 0, 8, 189, 215, 92, 61, 104, 71, 120, 249, 69, 188, 133, 166, 0, 155, 193,
            24, 183, 22, 111, 111, 236, 205, 82, 243, 237, 62, 223, 115, 163, 189, 26, 1, 87, 3, 223, 123, 99, 217, 4,
            50, 24, 208, 205, 153, 142, 44, 81, 36, 110, 29, 209, 96, 55, 94, 242, 250, 154, 0, 0, 0, 0, 29, 205, 101,
            0, 0, 0, 0, 0, 0, 1, 134, 160, 0, 0, 1, 99, 244, 96, 122, 145])
    },
    {
        data: {
            senderPublicKey: "27C8ksVhVFUXyngF1F8TfyCGLmkDMsm2QuTv4VvhBpJU",
            fee:  new BigNumber(100000),
            timestamp: 1543922401531,
            version: 2,
            amount:  new BigNumber(50000000000),
            recipient: "3PEDGbdcSYAorLoV4oDVSJPTezGUPFrZj8f"
        } as ILEASE_PROPS,
        type: TRANSACTION_TYPE_NUMBER.LEASE,
        bytes: Uint8Array.from([8, 2, 0, 16, 113, 194, 191, 58, 129, 20, 158, 230, 197, 166, 98, 76, 99, 66,
            135, 118, 233, 165, 158, 26, 117, 23, 246, 57, 123, 217, 249, 243, 168, 55, 65, 1, 87, 134, 186, 107, 125,
            95, 44, 61, 52, 136, 233, 54, 73, 184, 20, 79, 160, 152, 16, 141, 174, 109, 125, 95, 116, 0, 0, 0, 11, 164,
            59, 116, 0, 0, 0, 0, 0, 0, 1, 134, 160, 0, 0, 1, 103, 120, 242, 64, 251])
    },
    {
        data: {
            senderPublicKey: "DFYiAU7CJ3Vm3n2eofLVzfxuSBxjVTuR3bsdJqvyY7s",
            fee: new BigNumber(100000),
            timestamp: 1528764508254,
            version: 1,
            transactionId: "CwbYAN5635JFsjg9P7rHRuYTRGsX7UuLuhGqnCocWCYF"
        } as ICANCEL_LEASING_PROPS_V2,
        type: TRANSACTION_TYPE_NUMBER.CANCEL_LEASING,
        bytes: Uint8Array.from([9, 3, 35, 106, 240, 202, 147, 105, 122, 61, 98, 171, 49, 118, 68, 182, 155,
            147, 144, 135, 161, 239, 93, 247, 161, 52, 199, 28, 243, 144, 237, 230, 58, 0, 0, 0, 0, 0, 1, 134, 160, 0,
            0, 1, 99, 241, 119, 40, 94, 177, 108, 248, 166, 139, 12, 240, 236, 11, 55, 207, 45, 118, 135, 41, 201, 178, 242,
            215, 251, 167, 0, 90, 114, 127, 219, 19, 208, 178, 227, 93, 88])
    },
    {
        data: {
            senderPublicKey: "2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr",
            fee: new BigNumber(100000),
            timestamp: 1548157067513,
            chainId: MAINNET_BYTE,
            version: 2,
            transactionId: "2BB8bfVgxcUh3qNCEZ2QYEPcZFgvU5JmSoR12VG7phMV"
        } as ICANCEL_LEASING_PROPS_V2,
        type: TRANSACTION_TYPE_NUMBER.CANCEL_LEASING,
        bytes: Uint8Array.from([9, 2, 87, 19, 252, 132, 31, 108, 218, 109, 24, 75, 198, 202, 86, 159, 217,
            210, 255, 88, 88, 90, 106, 253, 69, 144, 38, 209, 216, 59, 162, 141, 206, 251, 97, 0, 0, 0, 0, 0, 1, 134,
            160, 0, 0, 1, 104, 117, 90, 32, 249, 17, 118, 243, 62, 62, 38, 190, 102, 93, 75, 137, 211, 247, 119, 157, 211, 0,
            212, 101, 28, 127, 102, 179, 132, 224, 70, 59, 1, 187, 250, 187, 220])
    },
    {
        data: {
            senderPublicKey: "31roLYdCifJaxyZS53FJpChijUYmtxMyLPFX57qJJ2ut",
            fee: new BigNumber(100000),
            timestamp: 1528823663546,
            version: 1,
            alias: "pp43529ita"
        } as ICREATE_ALIAS_PROPS,
        type: TRANSACTION_TYPE_NUMBER.CREATE_ALIAS,
        bytes: Uint8Array.from([10, 29, 239, 174, 129, 132, 160, 17, 56, 115, 86, 210, 91, 239, 125, 159, 106,
            118, 100, 254, 136, 97, 114, 128, 17, 110, 153, 195, 54, 148, 94, 171, 87, 0, 14, 2, 87, 0, 10, 112, 112,
            52, 51, 53, 50, 57, 105, 116, 97, 0, 0, 0, 0, 0, 1, 134, 160, 0, 0, 1, 99, 244, 253, 203, 186])
    },
    {
        data: {
            senderPublicKey: "27C8ksVhVFUXyngF1F8TfyCGLmkDMsm2QuTv4VvhBpJU",
            fee: new BigNumber(100000),
            timestamp: 1543434665440,
            version: 2,
            alias: "yyyyy"
        } as ICREATE_ALIAS_PROPS,
        type: TRANSACTION_TYPE_NUMBER.CREATE_ALIAS,
        bytes: Uint8Array.from([10, 2, 16, 113, 194, 191, 58, 129, 20, 158, 230, 197, 166, 98, 76, 99, 66, 135,
            118, 233, 165, 158, 26, 117, 23, 246, 57, 123, 217, 249, 243, 168, 55, 65, 0, 9, 2, 87, 0, 5, 121, 121, 121,
            121, 121, 0, 0, 0, 0, 0, 1, 134, 160, 0, 0, 1, 103, 91, 223, 253, 224])
    },
    {
        data: {
            senderPublicKey: "2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr",
            fee: new BigNumber(200000),
            timestamp: 1547553087818,
            version: 1,
            attachment: "",
            assetId: "WAVES",
            transfers: [
                {
                    recipient: "alias:W:merry",
                    amount: new BigNumber(1)
                },
                {
                    recipient: "alias:W:b.volkov",
                    amount: new BigNumber(1)
                }
            ]
        } as IMASS_TRANSFER_PROPS,
        type: TRANSACTION_TYPE_NUMBER.MASS_TRANSFER,
        bytes: Uint8Array.from([11, 1, 19, 252, 132, 31, 108, 218, 109, 24, 75, 198, 202, 86, 159, 217, 210,
            255, 88, 88, 90, 106, 253, 69, 144, 38, 209, 216, 59, 162, 141, 206, 251, 97, 0, 0, 2, 2, 87, 0, 5, 109,
            101, 114, 114, 121, 0, 0, 0, 0, 0, 0, 0, 1, 2, 87, 0, 8, 98, 46, 118, 111, 108, 107, 111, 118, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 13, 64, 0, 0])
    },
    {
        data: {
            senderPublicKey: "G9rStAuSaNjMi9KZNVfHymhCUeaWLFqAy88VtTAJre3q",
            fee: new BigNumber(100000),
            timestamp: 1523101012149,
            version: 1,
            data: [
                {
                    key: "bool",
                    type: "boolean",
                    value: true
                }
            ],
        } as IDATA_PROPS,
        type: TRANSACTION_TYPE_NUMBER.DATA,
        bytes: Uint8Array.from([    12, 1, 225, 35, 220, 2, 179, 125, 144, 119, 17, 183, 146, 243, 98, 211,
            44, 63, 144, 99, 118, 90, 175, 179, 3, 196, 213, 255, 119, 247, 33, 192, 193, 48, 0, 1, 0, 4, 98, 111, 111,
            108, 1, 1, 0, 0, 1, 98, 159, 229, 16, 181, 0, 0, 0, 0, 0, 1, 134, 160])
    },
    {
        data: {
            senderPublicKey: "3LZmDK7vuSBsDmFLxJ4qihZynUz8JF9e88dNu5fsus5p",
            fee: new BigNumber(2082496),
            chainId: MAINNET_BYTE,
            timestamp: 1537973512182,
            version: 1,
            script: "base64:AQQAAAAEaW5hbAIAAAAESW5hbAQAAAAFZWxlbmECAAAAB0xlbnVza2EEAAAABGxvdmUCAAAAC0luYWxMZW51c2thCQAAAAAAAAIJAAEsAAAAAgUAAAAEaW5hbAUAAAAFZWxlbmEFAAAABGxvdmV4ZFt5",
            data: [
                {
                    key: "bool",
                    type: "boolean",
                    value: true
                }
            ],
        } as ISET_SCRIPT_PROPS,
        type: TRANSACTION_TYPE_NUMBER.SET_SCRIPT,
        bytes: Uint8Array.from([ 13, 1, 87, 34, 186, 116, 34, 172, 44, 197, 73, 214, 113, 5, 102, 225, 116,
            239, 194, 226, 141, 33, 84, 123, 133, 156, 120, 24, 208, 196, 25, 42, 49, 161, 31, 1, 0, 114, 1, 4, 0, 0,
            0, 4, 105, 110, 97, 108, 2, 0, 0, 0, 4, 73, 110, 97, 108, 4, 0, 0, 0, 5, 101, 108, 101, 110, 97, 2, 0, 0,
            0, 7, 76, 101, 110, 117, 115, 107, 97, 4, 0, 0, 0, 4, 108, 111, 118, 101, 2, 0, 0, 0, 11, 73, 110, 97, 108,
            76, 101, 110, 117, 115, 107, 97, 9, 0, 0, 0, 0, 0, 0, 2, 9, 0, 1, 44, 0, 0, 0, 2, 5, 0, 0, 0, 4, 105, 110,
            97, 108, 5, 0, 0, 0, 5, 101, 108, 101, 110, 97, 5, 0, 0, 0, 4, 108, 111, 118, 101, 120, 100, 91, 121, 0, 0,
            0, 0, 0, 31, 198, 192, 0, 0, 1, 102, 22, 93, 103, 246])
    },
    {
        data: {
            senderPublicKey: "5v5D5pqzKGBejtvtEeyDJXG28iQwMViu1uuetEcyQp9v",
            fee: new BigNumber(100000000),
            timestamp: 1534448057070,
            version: 1,
            assetId: "FN76goSi7hQn6gQ8aezKVwyDvhkWx5ekXbP3sNLWqavN",
            minSponsoredAssetFee: new BigNumber(10)
        } as ISPONSORSHIP_PROPS,
        type: TRANSACTION_TYPE_NUMBER.SPONSORSHIP,
        bytes: Uint8Array.from([14, 1, 73, 7, 73, 249, 92, 224, 250, 196, 197, 215, 145, 181, 242, 89, 118,
            154, 157, 211, 177, 145, 86, 56, 110, 26, 28, 79, 104, 102, 42, 185, 59, 89, 213, 107, 181, 131, 53, 233,
            67, 195, 210, 149, 159, 86, 185, 205, 47, 135, 243, 63, 62, 50, 137, 9, 145, 100, 216, 180, 56, 250, 62,
            91, 49, 43, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 5, 245, 225, 0, 0, 0, 1, 101, 68, 59, 58, 238])
    },
    {
        data: {
            senderPublicKey: "AwQYJRHZNd9bvF7C13uwnPiLQfTzvDFJe7DTUXxzrGQS",
            fee: new BigNumber(100000000),
            timestamp: 1547201038106,
            version: 1,
            chainId: MAINNET_BYTE,
            assetId: "7qJUQFxniMQx45wk12UdZwknEW9cDgvfoHuAvwDNVjYv",
            script: "base64:AQa3b8tH",
        } as ISET_SCRIPT_PROPS,
        type: TRANSACTION_TYPE_NUMBER.SET_ASSET_SCRIPT,
        bytes: Uint8Array.from([15, 1, 87, 147, 169, 41, 147, 120, 117, 209, 248, 102, 80, 198, 167, 151, 88,
            252, 101, 239, 78, 102, 145, 237, 53, 60, 11, 27, 118, 74, 153, 102, 16, 51, 3, 101, 133, 193, 172, 62, 4,
            7, 125, 186, 133, 226, 25, 146, 253, 98, 105, 161, 123, 178, 123, 129, 74, 232, 247, 174, 75, 193, 37, 170,
            20, 192, 83, 0, 0, 0, 0, 5, 245, 225, 0, 0, 0, 1, 104, 60, 94, 71, 26, 1, 0, 6, 1, 6, 183, 111, 203, 71])
    }
];
