// Core
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Token } from '../types/common';
import { loginRequestData, signUpRequestData } from '../types/Api';

// Store
import { setUser } from './userSlice';
import { setErrorMessage } from './uiSlice';

// Instruments
import { api } from '../api';
import { FetchStatuses, FetchStatusesType } from '../constants/fetch-status';
import { isAxiosError } from '../utils/helpers';
import { UserModel } from '../types/UserModel';

export interface authSliceState {
    token: string | null;
    tokenCheckStatus: FetchStatusesType;
}

const initialState: authSliceState = {
    token:            null,
    tokenCheckStatus: FetchStatuses.idle,
};

export const authSlice = createSlice({
    name:     'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setTokenCheckStatus: (state, action) => {
            if (!Object.values(FetchStatuses).includes(action.payload)) {
                throw new Error(
                    '[AuthStore/setTokenCheckStatus] on correct status.',
                );
            }

            state.tokenCheckStatus = action.payload;
        },
    },
});

export const getIsAuth = (state: RootState): boolean => !!state.auth.token;

export const getTokenCheckStatus
    = (state: RootState): FetchStatusesType => state.auth.tokenCheckStatus;

export const { setToken, setTokenCheckStatus } = authSlice.actions;

export const login = createAsyncThunk<Token, loginRequestData, any>(
    'auth/login',
    async (credentials: loginRequestData, thunkAPI) => {
        try {
            const { data: newToken } = await api.auth.login(credentials);
            api.setToken(newToken);
            thunkAPI.dispatch(setToken(newToken));

            return newToken;
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                // @ts-expect-error
                const message = error?.response?.data?.message || error?.message;
                thunkAPI.dispatch(setErrorMessage(message));
            }

            return null;
        }
    },
);

export const signup = createAsyncThunk<Token, signUpRequestData, any>(
    'auth/login',
    async (userInfo: signUpRequestData, thunkAPI) => {
        try {
            const { data: newToken } = await api.auth.signup(userInfo);
            api.setToken(newToken);
            thunkAPI.dispatch(setToken(newToken));

            return newToken;
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                // @ts-expect-error
                const message = error?.response?.data?.message || error?.message;
                thunkAPI.dispatch(setErrorMessage(message));
            }

            return null;
        }
    },
);

export const logout = createAsyncThunk<any, any, any>(
    'auth/logout',
    async (param, thunkAPI) =>  {
        try {
            await api.auth.logout();
            api.removeToken();
            thunkAPI.dispatch(setToken(null));
            thunkAPI.dispatch(setTokenCheckStatus(FetchStatuses.idle));
            thunkAPI.dispatch(setUser(null));

            return true;
        } catch (error) {
            if (isAxiosError(error)) {
                // @ts-expect-error
                const message = error?.response?.data?.message || error?.message;
                thunkAPI.dispatch(setErrorMessage(message));
            }

            return null;
        }
    },
);

export const fetchProfile = createAsyncThunk<UserModel, any, any>(
    'auth/profile',
    async (param, thunkAPI) => {
        try {
            const userInfo = await api.auth.profile();
            thunkAPI.dispatch(setUser(userInfo));

            return userInfo;
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                // @ts-expect-error
                const message = error?.response?.data?.message || error?.message;
                thunkAPI.dispatch(setErrorMessage(message));
            }

            return null;
        }
    },
);
