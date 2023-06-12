// Core
import { FC } from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { SignUpRequestData } from '../../types/Api';
import { Token } from '../../types/common';

// Components
import { SignUpForm } from '../../components/Forms/SignUpForm';

// Store
import { useAppThunkDispatch } from '../../store';
import { signup } from '../../store/authSlice';

export const SignUpPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppThunkDispatch();

    const handlerOnFormSubmit
        = (userInfo: SignUpRequestData): Promise<AsyncThunk<Token, SignUpRequestData, any>> => {
        // @ts-expect-error
            return dispatch(signup(userInfo))
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
                <SignUpForm handlerOnFormSubmit = { handlerOnFormSubmit } />
            </section>
        </main>
    );
};
