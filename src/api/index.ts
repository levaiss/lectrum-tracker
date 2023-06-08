// Core
import axios, { AxiosResponse } from 'axios';
import { Token } from '../types/common';
import {
    Api,
    signUpRequestData,
    loginRequestData,
} from '../types/Api';

// Instruments
import { ROOT_URL, AUTH_TOKEN_KAY } from './config';

export const api: Api = {
    get token(): string {
        return localStorage.getItem(AUTH_TOKEN_KAY) ?? '';
    },
    setToken(token: Token): void {
        localStorage.setItem(AUTH_TOKEN_KAY, token);
    },
    removeToken(): void {
        localStorage.removeItem(AUTH_TOKEN_KAY);
    },
    auth: {
        async signup(userInfo: signUpRequestData): Promise<Token> {
            const { data }: { data: Token } = await axios.post(`${ROOT_URL}/register`, userInfo);

            return data;
        },
        async login(credentials: loginRequestData): Promise<Token> {
            const { data }: { data: Token } = await axios.post(`${ROOT_URL}/login`, credentials);

            return data;
        },
        auth(): Promise<AxiosResponse> {
            return axios.get(`${ROOT_URL}/auth`, {
                headers: {
                    Authorization: `Base ${api.token}`,
                },
            });
        },
        logout(): Promise<AxiosResponse> {
            return axios.get(`${ROOT_URL}/logout`, {
                headers: {
                    Authorization: `Base ${api.token}`,
                },
            });
        },
    },
};
