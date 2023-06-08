// Core
import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '../types/UserModel';
import { RootState } from './index';

export interface userSliceState {
    user: UserModel | null
}

const initialState: userSliceState = {
    user: null,
};

export const userSlice = createSlice({
    name:     'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const getUser = (state: RootState): UserModel | null => state.user.user;

export const getUserName = (state: RootState): string => state.user.user?.name ?? '';

export const { setUser } = userSlice.actions;
