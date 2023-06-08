// Core
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Stores
import { getIsAuth, logout } from '../../store/authSlice';

export const Navigation: FC = () => {
    const dispatch = useDispatch();
    const isAuth: boolean = useSelector(getIsAuth);
    const handlerOnLogout = () => {
        dispatch(logout(null));
    };

    return (
        <nav>
            { isAuth ? (
                <>
                    <NavLink
                        to = '/task-manager'>
                        До завдань
                    </NavLink>
                    <NavLink
                        to = '/profile'>
                        Профіль
                    </NavLink>
                    <button
                        type = 'button'
                        className = 'button-logout'
                        onClick = { handlerOnLogout }>
                        Вийти
                    </button>
                </>
            ) : (
                <NavLink
                    to = '/login'>
                    Увійти
                </NavLink>
            ) }
        </nav>
    );
};
