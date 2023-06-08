// Core
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

// Components
import { SignUpForm } from '../../components/Forms/SignUp';

// Store
import { signup } from '../../store/authSlice';

// Instruments
import { signUpRequestData } from '../../types/Api';
import { Token } from '../../types/common';

export const SignUpPage: FC = () => {
    const navigate = useNavigate();
    const dispatch: Dispatch = useDispatch();

    const handlerOnFormSubmit
        = (userInfo: signUpRequestData): Promise<AsyncThunk<Token, signUpRequestData, any>> => {
        // @ts-expect-error
            return dispatch(signup(userInfo))
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
                <SignUpForm handlerOnFormSubmit = { handlerOnFormSubmit } />
            </section>
        </main>
    );
};
