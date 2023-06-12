// Core
import axios, { AxiosResponse } from 'axios';
import { Token } from '../types/common';
import {
    Api,
    SignUpRequestData,
    LoginRequestData, TaskRequestData, TaskUpdateRequestData,
} from '../types/Api';

// Instruments
import { ROOT_URL, AUTH_TOKEN_KAY } from './config';
import { UserModel } from '../types/UserModel';
import { TagModel, TaskModel } from '../types/TaskModel';

export const api: Api = {
    get token(): Token {
        return localStorage.getItem(AUTH_TOKEN_KAY) ?? '';
    },
    setToken(token: Token): void {
        localStorage.setItem(AUTH_TOKEN_KAY, token);
    },
    removeToken(): void {
        localStorage.removeItem(AUTH_TOKEN_KAY);
    },
    auth: {
        async signup(userInfo: SignUpRequestData): Promise<Token> {
            const { data }: { data: Token } = await axios.post(`${ROOT_URL}/auth/registration`, userInfo);

            return data;
        },
        async login(credentials: LoginRequestData): Promise<Token> {
            const { email, password } = credentials;
            const { data }: { data: Token } = await axios.get(`${ROOT_URL}/auth/login`, {
                headers: {
                    Authorization: `Basic ${btoa(`${email}:${password}`)}`,
                },
            });

            return data;
        },
        async profile(): Promise<UserModel> {
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
    tasks: {
        async all(): Promise<TaskModel[]> {
            const { data }: { data: TaskModel[] } = await axios.get(`${ROOT_URL}/tasks`, {
                headers: {
                    Authorization: `Bearer ${api.token}`,
                },
            });

            return data;
        },
        async create(body: TaskRequestData): Promise<TaskModel> {
            const { data }: { data: TaskModel } = await axios.post(`${ROOT_URL}/tasks`, body, {
                headers: {
                    Authorization: `Bearer ${api.token}`,
                },
            });

            return data;
        },
        async update(payload: TaskUpdateRequestData): Promise<TaskModel> {
            const {
                id,
                body,
            } = payload;
            const { data }: { data: TaskModel } = await axios.put(`${ROOT_URL}/tasks/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${api.token}`,
                },
            });

            return data;
        },
        delete(id: string): Promise<any> {
            return axios.delete(`${ROOT_URL}/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${api.token}`,
                },
            });
        },
    },
    tags: {
        async all(): Promise<TagModel[]> {
            const tags: TagModel[] = await axios.get(`${ROOT_URL}/tags`, {
                headers: {
                    Authorization: `Bearer ${api.token}`,
                },
            });

            return tags;
        },
    },
};
