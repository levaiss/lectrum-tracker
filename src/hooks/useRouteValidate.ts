// Core
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

// Stores
import {
    getIsAuth, getTokenCheckStatus, setToken, setTokenCheckStatus,
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
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        const { token } = api;
        if (!token) {
            dispatch(setTokenCheckStatus(FetchStatuses.success));

            return;
        }

        void (async () => {
            try {
                if (tokenCheckStatus !== FetchStatuses.idle) {
                    return false;
                }

                await api.auth.auth();
                dispatch(setToken(api.token));
            } catch (error) {
                api.removeToken();
            } finally {
                dispatch(setTokenCheckStatus(FetchStatuses.success));
            }
        })();
    }, []);

    return {
        isAuth,
        tokenCheckStatus,
    };
}
