// Core
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface uiSliceState {
    errorMessage: string | null
}

const initialState: uiSliceState = {
    errorMessage: null,
};

export const uiSlice = createSlice({
    name:     'ui',
    initialState,
    reducers: {
        setErrorMessage: (state: uiSliceState, action) => {
            state.errorMessage = action.payload;
        },
    },
});

export const getErrorMessage = (state: RootState): string | null => state.ui.errorMessage;

export const { setErrorMessage } = uiSlice.actions;
