import { Token } from './common';

export interface Api {
    token: Token
    setToken: (token: Token) => void
    removeToken: () => void
    [key: string]: any
}

export interface loginRequestData {
    email: string
    password: string
}

export interface newPasswordRequestData {
    oldPassword: string
    newPassword: string
}

export interface signUpRequestData {
    name: string
    email: string
    password: string
}

export interface updateProfileRequestData {
    firstName: string
    lastName: string
}
