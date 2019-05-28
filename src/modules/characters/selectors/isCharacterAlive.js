import getBaseCharacterById from './getBaseCharacterById';
import getCharacterById from './getCharacterById';

/**
 * Tests if the character is alive.
 * @param {Object} state The global state
 * @param {Object} id A character id
 * @returns {boolean}
 */
const isCharacterAlive = (state, id) =>
    getBaseCharacterById(state, id) !== undefined &&
    getCharacterById(state, id).computed.HP > 0;

export default isCharacterAlive;
