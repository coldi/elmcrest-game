import getCharactersState from './getCharactersState';

/**
 * Selects the characters state as a list.
 * @param {Object} state The global state
 * @returns {Array} A list of characters
 */
const getCharactersList = state => Object.values(getCharactersState(state).byId);

export default getCharactersList;
