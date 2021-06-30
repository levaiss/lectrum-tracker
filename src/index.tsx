// Core
import { render } from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

// Components
import { App } from './app';

// Instruments
import { queryClient } from './lib/react-query';
import { store } from './lib/redux/init/store';
import './theme/styles/index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';

render(
    <Provider store = { store }>
        <QueryClientProvider client = { queryClient }>
            <App />
        </QueryClientProvider>
    </Provider>,
    document.getElementById('root'),
    () => {
        // eslint-disable-next-line no-console
        console.log('%c Приложение успешно запущено ', 'background: #00ff00; color: #000000; padding: 2.5px;');
    },
);
