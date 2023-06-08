// Core
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

// Instruments
import { FetchStatuses, FetchStatusesType } from '../constants/fetch-status';

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
