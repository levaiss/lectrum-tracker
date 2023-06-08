// Core
import { FC, ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Hooks
import { useRouteValidate } from '../hooks/useRouteValidate';

// Instruments
import { FetchStatuses } from '../constants/fetch-status';

interface PublicRouteProps {
    children?: ReactElement
    restricted: boolean
    redirectPath: string
}

export const PublicRoute: FC<PublicRouteProps>
    = ({
        children,
        restricted,
        redirectPath = '/',
    }) => {
        const {
            isAuth,
            tokenCheckStatus,
        } = useRouteValidate();

        if (tokenCheckStatus !== FetchStatuses.success) {
            return null;
        }

        if (isAuth && restricted) {
            return <Navigate to = { redirectPath } />;
        }

        return children ?? <Outlet />;
    };
