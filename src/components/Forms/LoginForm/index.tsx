/* Core */
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Components
import { UiInput } from '../../Ui/UiInput';

// Instruments
import { LoginFormSchema } from './config';

export const LoginForm: FC = () => {
    const {
        handleSubmit,
        formState,
        register,
        reset,
    } = useForm({
        mode:          'onChange',
        resolver:      yupResolver(LoginFormSchema),
        defaultValues: {
            email:    '',
            password: '',
        },
    });

    return (
        <form onSubmit = { () => {} }>
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
