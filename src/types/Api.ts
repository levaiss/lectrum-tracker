import { Token } from './common';

export interface Api {
    token: Token
    setToken: (token: Token) => void
    removeToken: () => void
    [key: string]: any
}

export interface LoginRequestData {
    email: string
    password: string
}

export interface SignUpRequestData {
    name: string
    email: string
    password: string
}

export interface TaskRequestData {
    completed: boolean
    title: string
    description: string
    deadline: Date | number | string
    tag: string
}

export interface TaskUpdateRequestData {
    id: string
    body: TaskRequestData
}
