import getI18nState from './getI18nState';

/**
 * Gets the current language code from the state.
 * @param {Object} state The global state
 * @returns {Object} A group object
 */
const getLang = (state) => (
    getI18nState(state).lang
);

export default getLang;
