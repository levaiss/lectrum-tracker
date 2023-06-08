// Core
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Components
import { App } from './app';

// Store
import { StoreProvider } from './lib/StoreContext';

// Instruments
import './theme/styles/index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';

render(
    <BrowserRouter>
        <StoreProvider>
            <App />
        </StoreProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
