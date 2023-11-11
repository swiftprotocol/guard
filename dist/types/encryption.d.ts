import type { SymmKey } from './database.js';
export interface EncryptParams {
    data: string;
    recipients: string[];
}
export interface EncryptResult {
    symmetricKeys: SymmKey[];
    cipherText: string;
}
export interface DecryptParams {
    symmetricKey: SymmKey;
    cipherText: string;
    recipientPrivateKey: string;
}
