// Core
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const NoMatch: FC = () => {
    return (
        <main>
            <div className = 'feed-wrapper'>
                <div className = 'container'>
                    <div>
                        <h1>404! Page not found</h1>
                        <NavLink
                            to = '/'>
                            Home page
                        </NavLink>
                    </div>
                </div>
            </div>
        </main>
    );
};
