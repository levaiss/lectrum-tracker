// Core
import { AnyAction, compose, Middleware } from 'redux';
/* eslint-disable import/no-extraneous-dependencies, node/no-unpublished-import */
import { createLogger } from 'redux-logger';

export const logger = createLogger({
    duration:  true,
    collapsed: true,
    colors:    {
        title: (action: AnyAction) => {
            return action.error ? 'firebrick' : 'deepskyblue';
        },
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005',
    },
});

const developmentEnvironment = process.env.NODE_ENV === 'development';
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = developmentEnvironment && devtools ? devtools : compose;

const middleware: Middleware[] = [];

if (developmentEnvironment) {
    middleware.push(logger);
}

export { composeEnhancers, middleware };
