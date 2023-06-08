// Core
import { FC, useEffect } from 'react';
import { Dispatch } from 'redux';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { toast, ToastContainer, Slide } from 'react-toastify';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { TaskManager } from './pages/TaskManager';
import { NoMatch } from './pages/NoMatch';

// Store
import { getErrorMessage, setErrorMessage } from './store/uiSlice';

// Instrument
import { toastOptions } from './constants/toastOptions';

export const App: FC = () => {
    const errorMessage: string | null = useSelector(getErrorMessage);
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage, toastOptions);

            dispatch(setErrorMessage(null));
        }
    }, [errorMessage]);

    return (
        <>
            <ToastContainer newestOnTop transition = { Slide } />
            <Routes>
                <Route path = '/' element = { <HomePage /> } />
                <Route element = {
                    <PublicRoute restricted redirectPath = '/task-manager' />
                }>
                    <Route path = '/login' element = { <LoginPage /> } />
                    <Route path = '/signup' element = { <SignUpPage /> } />
                </Route>
                <Route element = { <PrivateRoute redirectPath = '/login' /> }>
                    <Route path = '/task-manager' element = { <TaskManager /> } />
                </Route>
                <Route path = '*' element = { <NoMatch /> } />
            </Routes>
            <Footer />
        </>
    );
};

