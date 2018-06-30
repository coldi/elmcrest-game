import {
    MALE_GENDER,
    FEMALE_GENDER,
    NO_GENDER,
} from '../../characters';
import translate from '../translate';

/**
 * Capitalizes the first letter of a given string.
 * @param {string} string
 * @returns {string}
 */
const cap = (string) => (
    string.charAt(0).toUpperCase() + string.slice(1)
);

/**
 * Resolves gender-based he/she/it translation.
 * @param {string} lang
 * @returns {Function}
 */
const heSheIt = (lang) => ({
    param = 'gender',
    transform = str => str
} = {}) => (
    `{${param}, select,
        ${MALE_GENDER} { ${transform(translate(lang, 'gender.he'))} }
        ${FEMALE_GENDER} { ${transform(translate(lang, 'gender.she'))} }
        ${NO_GENDER} { ${transform(translate(lang, 'gender.it'))} }
    }`
);

/**
 * Resolves gender-based his/her/its translation.
 * @param {string} lang
 * @returns {Function}
 */
const hisHerIts = (lang) => ({
    param = 'gender',
    transform = str => str
} = {}) => (
    `{${param}, select,
        ${MALE_GENDER} { ${transform(translate(lang, 'gender.his'))} }
        ${FEMALE_GENDER} { ${transform(translate(lang, 'gender.her'))} }
        ${NO_GENDER} { ${transform(translate(lang, 'gender.its'))} }
    }`
);

/**
 * Resolves gender-based him/her/it translation.
 * @param {string} lang
 * @returns {Function}
 */
const himHerIt = (lang) => ({
    param = 'gender',
    transform = str => str
} = {}) => (
    `{${param}, select,
        ${MALE_GENDER} { ${transform(translate(lang, 'gender.him'))} }
        ${FEMALE_GENDER} { ${transform(translate(lang, 'gender.her'))} }
        ${NO_GENDER} { ${transform(translate(lang, 'gender.it'))} }
    }`
);

/**
 * Returns an object with i18n translation helpers.
 * @param {string} lang
 * @returns {Object}
 */
export default function makeHelpers (lang) {
    return {
        cap,
        heSheIt: heSheIt(lang),
        hisHerIts: hisHerIts(lang),
        himHerIt: himHerIt(lang),
    };
}
