import getCharacterById from './getCharacterById';
import getCharactersSettings from './getCharactersSettings';

/**
 * Returns the player character.
 * @param {Object} state The global state
 * @returns {Object} The player character object
 */
const getPlayer = state => getCharacterById(state, getCharactersSettings(state).playerId);

export default getPlayer;
