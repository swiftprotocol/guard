import Guard from '../index.js';
export default function authorize(this: Guard, address: string, key: string, recipient: string, privateKeyHex: string, namespace?: string): Promise<void>;
