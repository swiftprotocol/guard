import type { StdTx } from '@cosmjs/amino';
import Guard from '../index.js';
export default function set(this: Guard, key: string, value: string, recipients: string[], signature: StdTx, namespace?: string): Promise<void>;
