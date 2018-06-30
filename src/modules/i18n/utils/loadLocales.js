import loadScript from '../../utils/loadScript';
import makeHelpers from './makeHelpers';

/**
 * Loads a locales file from a given path and returns the locale object.
 * If the resolved locales are wrappend inside a function,
 * locale helpers are injected.
 * @param {string} path
 * @param {string} lang
 * @returns {Object}
 */
const loadLocales = async (path, lang) => {
    const locales = await loadScript(`${path}/${lang}.js`);

    if (typeof locales === 'function') {
        const helpers = makeHelpers(lang);

        return locales({ helpers });
    }

    return locales;
};

export default loadLocales;
