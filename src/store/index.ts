// Core
import { configureStore } from '@reduxjs/toolkit';

// Stores
import { authSlice, authSliceState } from './authSlice';
import { uiSlice, uiSliceState } from './uiSlice';
import { userSlice, userSliceState } from './userSlice';
import { taskSlice, taskSliceState } from './taskSlice';

export interface RootState {
    auth: authSliceState
    ui: uiSliceState
    user: userSliceState
    task: taskSliceState
}

export const Store =  configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui:   uiSlice.reducer,
        user: userSlice.reducer,
        task: taskSlice.reducer,
    },
});
