import type { DecryptParams } from '../types/encryption.js';
export default function decrypt({ symmetricKey, cipherText, recipientPrivateKey, }: DecryptParams): Promise<string>;
