// Core
import { FC, ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Hooks
import { useRouteValidate } from '../hooks/useRouteValidate';

// Instruments
import { FetchStatuses } from '../constants/fetch-status';

interface PrivateRouteProps {
    children?: ReactElement
    redirectPath: string
}

export const PrivateRoute: FC<PrivateRouteProps>
    = ({
        children,
        redirectPath,
    }) => {
        const {
            isAuth,
            tokenCheckStatus,
        } = useRouteValidate();

        if (tokenCheckStatus !== FetchStatuses.success) {
            return null;
        }

        if (!isAuth) {
            return <Navigate to = { redirectPath } replace />;
        }

        return children ?? <Outlet />;
    };
