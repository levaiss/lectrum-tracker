/* Core */
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AsyncThunk } from '@reduxjs/toolkit';

// Components
import { UiInput } from '../../Ui/UiInput';

// Instruments
import { LoginFormSchema } from './config';
import { Token } from '../../../types/common';
import { LoginRequestData } from '../../../types/Api';

interface loginFormProps {
    handlerOnFormSubmit:
    (credentials: LoginRequestData) => Promise<AsyncThunk<Token, LoginRequestData, any>>;
}

export const LoginForm: FC<loginFormProps> = ({ handlerOnFormSubmit }) => {
    const {
        handleSubmit,
        formState,
        register,
    } = useForm({
        mode:          'onChange',
        resolver:      yupResolver(LoginFormSchema),
        defaultValues: {
            email:    '',
            password: '',
        },
    });

    const submitForm = handleSubmit((credentials: LoginRequestData) => {
        return handlerOnFormSubmit(credentials);
    });

    return (
        <form onSubmit = { submitForm }>
            <fieldset>
                <legend>Вхід</legend>
                <UiInput
                    placeholder = 'Пошта'
                    autoComplete = 'email'
                    type = 'email'
                    name = 'email'
                    autoFocus
                    error = { formState.errors.email }
                    register = { register('email') } />
                <UiInput
                    placeholder = 'Пароль'
                    type = 'password'
                    name = 'password'
                    error = { formState.errors.password }
                    register = { register('password') } />
                <button
                    type = 'submit'
                    className = 'button-login'>
                    Увійти
                </button>
            </fieldset>
            <p className = 'options'>
                Немає облікового запису? <NavLink to = '/signup'>Створити</NavLink>
            </p>
        </form>
    );
};
