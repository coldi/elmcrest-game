import Immutable from 'seamless-immutable';
import { getCurrentStrings, setCurrentStrings } from '../locales';
import getI18nState from '../selectors/getI18nState';
import loadLocales from '../utils/loadLocales';
import addLocalePathAction from './addLocalePathAction';

/**
 * Gets the locales from a given path and updates the current locale strings.
 * @param {string} path
 * @returns {Function} A redux thunk
 */
const extendLocales = (path) => async (dispatch, getState) => {
    const { lang } = getI18nState(getState());

    dispatch(addLocalePathAction(path));

    setCurrentStrings(
        Immutable.merge(
            getCurrentStrings(),
            await loadLocales(path, lang),
            { deep: true }
        )
    );
};

export default extendLocales;
