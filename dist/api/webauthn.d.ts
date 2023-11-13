import type { RegistrationEncoded, RegistrationParsed } from '@swiftprotocol/auth/types';
import { ErrorResponse } from '../types/api.js';
export interface ChallengeResponse {
    hexAddress: string;
    challenge: string;
}
export interface VerifyResponse {
    hexAddress: string;
    credential: RegistrationParsed['credential'];
    client: RegistrationParsed['client'];
}
export default class Webauthn {
    private api;
    constructor(api: string);
    challenge({ address }: {
        address: string;
    }): Promise<import("axios").AxiosResponse<ErrorResponse | ChallengeResponse, any>>;
    verify({ address, registration, }: {
        address: string;
        registration: RegistrationEncoded;
    }): Promise<import("axios").AxiosResponse<ErrorResponse | VerifyResponse, any>>;
}
