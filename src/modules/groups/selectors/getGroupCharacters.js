import getCharacterById from '../../characters/selectors/getCharacterById';
import getGroupById from './getGroupById';

/**
 * Returns the characters of a group.
 * @param {Object} state The global state
 * @param {string} id A group id
 * @returns {Array} The list of characters
 */
const getGroupCharacters = (state, id) => (
    getGroupById(state, id).characterIds.map(
        (charId) => getCharacterById(state, charId)
    )
);

export default getGroupCharacters;
