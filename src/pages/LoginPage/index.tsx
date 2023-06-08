// Core
import { FC } from 'react';

// Components
import { LoginForm } from '../../components/Forms/LoginForm';

export const LoginPage: FC = () => {
    return (
        <main>
            <section className = 'sign-form'>
                <LoginForm />
            </section>
        </main>
    );
};
