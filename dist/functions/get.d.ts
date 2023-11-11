import Guard from '../index.js';
export default function get(this: Guard, address: string, key: string, privateKeyHex: string, namespace?: string): Promise<string>;
