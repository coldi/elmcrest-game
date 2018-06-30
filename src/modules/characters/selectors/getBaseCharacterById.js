import getCharactersState from './getCharactersState';

/**
 * Returns a base character from state without any modifications.
 * @param {Object} state The global state
 * @param {string} id A character id
 * @returns {Object} A character object
 */
const getBaseCharacterById = (state, id) => (
    getCharactersState(state).byId[id]
);

export default getBaseCharacterById;
