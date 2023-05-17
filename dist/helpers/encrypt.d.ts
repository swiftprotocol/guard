interface EncryptParams {
    data: string;
    recipientPubKey: string;
}
export declare function encrypt({ data, recipientPubKey, }: EncryptParams): Promise<string>;
export {};
