// Core
import { useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';

// Stores
import {
    getIsAuth, getTokenCheckStatus, setToken, setTokenCheckStatus, fetchProfile,
} from '../store/authSlice';

// Instruments
import { api } from '../api';
import { FetchStatuses, FetchStatusesType } from '../constants/fetch-status';

interface useRouteValidateResult {
    isAuth: boolean
    tokenCheckStatus: FetchStatusesType
}

export function useRouteValidate(): useRouteValidateResult {
    const isAuth: boolean = useSelector(getIsAuth);
    const tokenCheckStatus: FetchStatusesType = useSelector(getTokenCheckStatus);
    const dispatch: ThunkDispatch<any, any, any> = useDispatch();

    useEffect(() => {
        if (tokenCheckStatus !== FetchStatuses.idle) {
            return;
        }

        const { token } = api;
        if (token) {
            dispatch(setToken(token));
            dispatch(fetchProfile(null));
        }

        dispatch(setTokenCheckStatus(FetchStatuses.success));
    }, []);

    return {
        isAuth,
        tokenCheckStatus,
    };
}
