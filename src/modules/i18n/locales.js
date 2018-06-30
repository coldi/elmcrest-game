/**
 * The current locales of the i18n module.
 */
const locale = {
    strings: {},
};

/**
 * Sets the current strings.
 * @param {Object} strings An object with locale strings
 */
export const setCurrentStrings = (strings = {}) => {
    locale.strings = strings;
};

/**
 * Gets the current strings.
 * @returns {Object}
 */
export const getCurrentStrings = () => (
    locale.strings
);
