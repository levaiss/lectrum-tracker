// Core
import { FC } from 'react';

export const Footer: FC = () => {
    return (
        <footer>
            <span>© { new Date().getFullYear() } Lectrum LLC - All Rights Reserved.</span>
        </footer>
    );
};
