import type { PushSubscription } from 'web-push';
import type { ErrorResponse } from '../types/api';
export interface SubscribeResponse {
    pubkey: string;
}
export interface GetAuthorizationsResponse {
    authorizations: string[];
}
export interface SetAuthorizationsResponse {
    authorizations: string[];
}
export default class Data {
    private api;
    constructor(api: string);
    getAuthorizations({ pubkey }: {
        pubkey: string;
    }): Promise<import("axios").AxiosResponse<ErrorResponse | GetAuthorizationsResponse, any>>;
    setAuthorizations({ pubkey, authorizations, signature, }: {
        pubkey: string;
        authorizations: string[];
        signature: string;
    }): Promise<import("axios").AxiosResponse<ErrorResponse | SetAuthorizationsResponse, any>>;
    subscribe({ app, pubkey, signature, subscription, }: {
        app: string;
        pubkey: string;
        signature: string;
        subscription: PushSubscription;
    }): Promise<import("axios").AxiosResponse<ErrorResponse | SubscribeResponse, any>>;
}
