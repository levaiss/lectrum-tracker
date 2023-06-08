// Core
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation: FC = () => {
    return (
        <nav>
            <NavLink
                to = '/login'>
                Увійти
            </NavLink>
            <NavLink
                to = '/task-manager'>
                До завдань
            </NavLink>
            <NavLink
                to = '/profile'>
                Профіль
            </NavLink>
        </nav>
    );
};
