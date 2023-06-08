import { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';

import { Store } from '../store';

interface StoreProviderPropTypes {
    children: ReactElement
}

export const StoreProvider: FC<StoreProviderPropTypes> = ({ children }) => {
    return (
        <Provider store = { Store }>{ children }</Provider>
    );
};
