import type { EncryptParams, EncryptResult } from '../types/encryption.js';
export default function encrypt({ data, recipients, }: EncryptParams): Promise<EncryptResult>;
