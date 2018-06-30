import get from 'lodash/get';
import IntlMessageFormat from 'intl-messageformat';
import { memoizeHash } from '../utils/memoize';
import { getCurrentStrings } from './locales';

/**
 * Returns an instance of IntlMessageFormat from cache based on a hash.
 * The hash is generated from given language code and translation key.
 * If no instance exists yet, a new instance will be created and returned.
 * @param {string} lang A language code
 * @param {string} key A translation key
 * @returns {IntlMessageFormat}
 */
const getMessageFromCache = memoizeHash(
    (lang, key) => `${lang}_${key}`,
    (lang, key) => {
        const strings = getCurrentStrings();

        return new IntlMessageFormat(
            get(strings, key, /* fallback: */ key),
            lang
        );
    }
);

/**
 * Get a translation for a given key.
 * @param {string} lang A language code
 * @param {string} key A translation key
 * @param {Object} [args] Arguments for the translation
 * @returns {string}
 */
const translate = (lang, key, args = {}) => (
    typeof key === 'string' ? (
        getMessageFromCache(lang, key).format(args)
    ) : (
        key
    )
);

export default translate;
