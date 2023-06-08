/* Core */
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Components
import { AsyncThunk } from '@reduxjs/toolkit';
import { UiInput } from '../../Ui/UiInput';

// Instruments
import { SignUpFormSchema } from './config';
import { signUpRequestData } from '../../../types/Api';
import { Token } from '../../../types/common';

interface signupFormProps {
    handlerOnFormSubmit:
    (credentials: signUpRequestData) => Promise<AsyncThunk<Token, signUpRequestData, any>>;
}

export const SignUpForm: FC<signupFormProps> = ({ handlerOnFormSubmit }) => {
    const {
        handleSubmit,
        formState,
        register,
    } = useForm({
        mode:          'onChange',
        resolver:      yupResolver(SignUpFormSchema),
        defaultValues: {
            name:            '',
            email:           '',
            password:        '',
            confirmPassword: '',
        },
    });

    const submitForm = handleSubmit((body) => {
        const {
            confirmPassword,
            ...userInfo
        } = body;

        return handlerOnFormSubmit(userInfo);
    });

    return (
        <form
            onSubmit = { submitForm }>
            <fieldset>
                <legend>Реєстрація</legend>
                <UiInput
                    placeholder = "Ім'я"
                    autoComplete = 'name'
                    name = 'name'
                    autoFocus
                    error = { formState.errors.name }
                    register = { register('name') } />
                <UiInput
                    placeholder = 'Пошта'
                    autoComplete = 'email'
                    name = 'email'
                    type = 'email'
                    error = { formState.errors.email }
                    register = { register('email') } />
                <UiInput
                    placeholder = 'Пароль'
                    type = 'password'
                    name = 'password'
                    error = { formState.errors.password }
                    register = { register('password') } />
                <UiInput
                    placeholder = 'Повторіть пароль'
                    type = 'password'
                    name = 'confirmPassword'
                    error = { formState.errors.confirmPassword }
                    register = { register('confirmPassword') } />
                <button
                    type = 'submit'
                    className = 'button-login'>
                    Створити акаунт
                </button>
            </fieldset>
            <p className = 'options'>
                Є обліковий запис? <NavLink to = '/login'>Увійти</NavLink>
            </p>
        </form>
    );
};
