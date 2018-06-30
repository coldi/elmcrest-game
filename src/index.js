import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { getSavedState, hasSavedState } from './modules/savegames';
import moduleSubscriptions from './modules/subscriptions';
import I18nProvider from './views/i18n/Provider';
import App from './views/app';
import subscribeToModules from './subscribers';
import createStore from './store';
import runSetup from './setup';
import './styles/main.scss';

// initialize all module subscriptions
subscribeToModules(moduleSubscriptions);

// create the store instance
const store = createStore(getSavedState());

// wrap react-dom rendering
const render = AppComponent => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <I18nProvider>
                    <AppComponent />
                </I18nProvider>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

// initial game setup
runSetup(store.dispatch, hasSavedState()).then(() => {
    // mount app
    render(App);

    if (module.hot) {
        // enable HMR updates
        module.hot.accept('./views/app', () => render(App));
    }
});
