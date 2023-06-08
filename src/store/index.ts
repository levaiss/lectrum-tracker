// Core
import { configureStore } from '@reduxjs/toolkit';

// Stores
import { authSlice, authSliceState } from './authSlice';
import { uiSlice, uiSliceState } from './uiSlice';
import { userSlice, userSliceState } from './userSlice';

export interface RootState {
    auth: authSliceState
    ui: uiSliceState
    user: userSliceState
}

export const Store =  configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui:   uiSlice.reducer,
        user: userSlice.reducer,
    },
});
