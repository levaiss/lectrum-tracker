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
import { UserModel } from '../types/UserModel';

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
            const { data }: { data: Token } = await axios.post(`${ROOT_URL}/auth/register`, userInfo);

            return data;
        },
        async login(credentials: loginRequestData): Promise<Token> {
            const { email, password } = credentials;
            const { data }: { data: Token } = await axios.get(`${ROOT_URL}/auth/login`, {
                headers: {
                    Authorization: `Basic ${btoa(`${email}:${password}`)}`,
                },
            });

            return data;
        },
        async auth(): Promise<UserModel> {
            const { data }: { data: UserModel } = await axios.get(`${ROOT_URL}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${api.token}`,
                },
            });

            return data;
        },
        logout(): Promise<AxiosResponse> {
            return axios.get(`${ROOT_URL}/auth/logout`, {
                headers: {
                    Authorization: `Bearer ${api.token}`,
                },
            });
        },
    },
};
