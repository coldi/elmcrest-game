import getCharacterById from '../../characters/selectors/getCharacterById';
import getGroupById from './getGroupById';

/**
 * Returns the leading character of a group.
 * @param {Object} state The global state
 * @param {string} id A group id
 * @returns {Object} A character object
 */
const getGroupLeader = (state, id) => {
    const charId = getGroupById(state, id).characterIds[0];
    return getCharacterById(state, charId);
};

export default getGroupLeader;
