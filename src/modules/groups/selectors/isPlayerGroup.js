import getPlayerGroup from './getPlayerGroup';

/**
 * Tests if a given given group id is the player group id.
 * @param {Object} state The global state
 * @param {string} id A group id
 * @returns {boolean}
 */
const isPlayerGroup = (state, id) => {
    const playerGroup = getPlayerGroup(state);

    if (!playerGroup) return false;

    return playerGroup.id === id;
};

export default isPlayerGroup;
