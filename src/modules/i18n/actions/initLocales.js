import Immutable from 'seamless-immutable';
import { setCurrentStrings } from '../locales';
import getI18nState from '../selectors/getI18nState';
import loadLocales from '../utils/loadLocales';

/**
 * Reads through all locale paths and updates the current locale strings.
 * @returns {Function} A redux thunk
 */
const initLocales = () => async (dispatch, getState) => {
    const { localePaths, lang } = getI18nState(getState());

    const results = await Promise.all(localePaths.map(path => loadLocales(path, lang)));

    const localeStrings = results.reduce(
        (locales, result) => Immutable.merge(locales, result, { deep: true }),
        {}
    );

    setCurrentStrings(localeStrings);
};

export default initLocales;
