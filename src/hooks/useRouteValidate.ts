// Core
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// Stores
import { useAppThunkDispatch } from '../store';
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
    const dispatch = useAppThunkDispatch();

    useEffect(() => {
        if (tokenCheckStatus !== FetchStatuses.idle) {
            return;
        }

        const { token } = api;
        if (token) {
            dispatch(setToken(token));
            void dispatch(fetchProfile(null));
        }

        dispatch(setTokenCheckStatus(FetchStatuses.success));
    }, []);

    return {
        isAuth,
        tokenCheckStatus,
    };
}
