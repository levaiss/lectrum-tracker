// Core
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

// Components
import { LoginForm } from '../../components/Forms/LoginForm';

// Store
import { login } from '../../store/authSlice';

// Instruments
import { loginRequestData } from '../../types/Api';
import { Token } from '../../types/common';

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const dispatch: Dispatch = useDispatch();

    const handlerOnFormSubmit
        = (credentials: loginRequestData): Promise<AsyncThunk<Token, loginRequestData, any>> => {
            // @ts-expect-error
            return dispatch(login(credentials))
                .then((response: { payload: Token }) => {
                    const { payload } = response;
                    if (payload) {
                        navigate('/task-manager');
                    }

                    return response;
                });
        };

    return (
        <main>
            <section className = 'sign-form'>
                <LoginForm handlerOnFormSubmit = { handlerOnFormSubmit } />
            </section>
        </main>
    );
};
