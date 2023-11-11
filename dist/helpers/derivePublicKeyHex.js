import NodeRSA from 'node-rsa';
// We use NodeRSA here because WebCrypto does not support deriving RSA pubkeys
export default function derivePublicKeyHex(privateKeyHex) {
    const privateKeyBuffer = Buffer.from(privateKeyHex, 'hex');
    const key = new NodeRSA(privateKeyBuffer, 'pkcs1-private-der');
    const publicKeyHex = key.exportKey('pkcs8-public-der').toString('hex');
    return publicKeyHex;
}
//# sourceMappingURL=derivePublicKeyHex.js.map