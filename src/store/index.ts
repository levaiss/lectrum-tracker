// Core
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { configureStore, Action } from '@reduxjs/toolkit';

// Stores
import { authSlice } from './authSlice';
import { uiSlice } from './uiSlice';
import { userSlice } from './userSlice';
import { taskSlice } from './taskSlice';

export const Store =  configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui:   uiSlice.reducer,
        user: userSlice.reducer,
        task: taskSlice.reducer,
    },
});

export type RootState = ReturnType<typeof Store.getState>;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();
