import Guard from '../index.js';
export default function revoke(this: Guard, address: string, key: string, recipient: string, privateKeyHex: string, namespace?: string): Promise<void>;
