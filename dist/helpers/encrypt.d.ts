interface EncryptParams {
    data: string;
    recipientPubKey: string;
}
interface EncryptedData {
    value: string;
    symmkey: string;
}
export declare function encrypt({ data, recipientPubKey, }: EncryptParams): Promise<EncryptedData>;
export {};
