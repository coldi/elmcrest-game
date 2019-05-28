import getGroupsSettings from './getGroupsSettings';
import getGroupById from './getGroupById';

/**
 * Returns the player's group.
 * @param {Object} state
 * @returns {Object}
 */
const getPlayerGroup = state =>
    getGroupById(state, getGroupsSettings(state).playerGroupId);

export default getPlayerGroup;
