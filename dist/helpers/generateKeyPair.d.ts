export default function generateKeyPair(): Promise<{
    keyPair: CryptoKeyPair;
    privateKeyBuffer: ArrayBuffer;
    privateKeyHex: string;
    publicKeyBuffer: ArrayBuffer;
    publicKeyHex: string;
}>;
