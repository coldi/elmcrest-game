import getGroupsState from './getGroupsState';

/**
 * Gets a group from the group state by a given id.
 * @param {Object} state The group state
 * @param {string} id A group id
 * @returns {Object} A group object
 */
const getGroupById = (state, id) => (
    getGroupsState(state).byId[id]
);

export default getGroupById;
