declare module 'base64-js' {

    export function byteLength(b64: string): number;

    export function toByteArray(b64: string): Uint8Array;

    export function fromByteArray(bytes: Uint8Array): string;
}
