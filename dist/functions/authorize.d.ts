import type { StdTx } from '@cosmjs/amino';
import Guard from '../index.js';
export default function authorize(this: Guard, address: string, key: string, recipient: string, privateKeyHex: string, signature: StdTx, namespace?: string): Promise<void>;
