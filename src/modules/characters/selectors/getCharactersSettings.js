import getCharactersState from './getCharactersState';

/**
 * Selects the characters settings.
 * @param {Object} state The global state
 * @returns {Object}
 */
const getCharactersSettings = (state) => getCharactersState(state).settings;

export default getCharactersSettings;
