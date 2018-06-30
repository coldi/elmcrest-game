import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { batchedSubscribe } from 'redux-batched-subscribe';
import debounce from 'lodash/debounce';
import ReduxThunk from 'redux-thunk';
import observableMiddleware from './middleware';
import reducers from './modules/reducers';

const { NODE_ENV } = process.env;

/* eslint-disable  no-underscore-dangle */
export default function createCustomStore (preloadedState) {
    const reducer = combineReducers(reducers);
    const enhancers = [
        applyMiddleware(ReduxThunk, observableMiddleware),
    ];
    let composeEnhancers = compose;

    if (NODE_ENV !== 'production') {
        // apply redux devtools when not in production
        if (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        }
    }

    if (NODE_ENV !== 'test') {
        // batch redux subscribe notifications when not running tests
        enhancers.push(batchedSubscribe(debounce(notify => notify())));
    }

    const store = createStore(reducer, preloadedState, composeEnhancers(...enhancers));

    if (module.hot) {
        // enable HMR updates for reducers
        module.hot.accept('./modules/reducers', () => {
            const nextReducers = require('./modules/reducers').default;
            store.replaceReducer(nextReducers);
        });
    }

    return store;
}
