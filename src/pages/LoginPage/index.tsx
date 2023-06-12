// Core
import { FC } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

// Components
import { LoginForm } from '../../components/Forms/LoginForm';

// Store
import { useAppThunkDispatch } from '../../store';
import { login } from '../../store/authSlice';

// Instruments
import { LoginRequestData } from '../../types/Api';
import { Token } from '../../types/common';

export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppThunkDispatch();

    const handlerOnFormSubmit
        = (credentials: LoginRequestData): Promise<AsyncThunk<Token, LoginRequestData, any>> => {
            // @ts-expect-error
            return dispatch(login(credentials))
                .then((response) => {
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
