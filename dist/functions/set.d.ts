import Guard from '../index.js';
export default function set(this: Guard, key: string, value: string, recipients: string[], signature: string, publicKey: string, namespace?: string): Promise<void>;
