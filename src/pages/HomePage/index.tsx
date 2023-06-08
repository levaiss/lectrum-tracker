// Core
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Store
import { getIsAuth } from '../../store/authSlice';

export const HomePage: FC = () => {
    const isAuth: boolean = useSelector(getIsAuth);

    if (!isAuth) {
        return <Navigate to = '/login' replace />;
    }

    return <Navigate to = '/task-manager' replace />;
};
