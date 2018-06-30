import getGroupCharacters from './getGroupCharacters';
import getPlayerGroup from './getPlayerGroup';

/**
 * Returns the characters of the player's group.
 * @param {Object} state The global state
 * @returns {Array} The list of characters
 */
const getPlayerGroupCharacters = (state) => (
    getGroupCharacters(
        state,
        getPlayerGroup(state).id
    )
);

export default getPlayerGroupCharacters;
