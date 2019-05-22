import getGroupsState from './getGroupsState';

/**
 * Selects the groups settings.
 * @param {Object} state The global state
 * @returns {Object}
 */
const getGroupsSettings = state => getGroupsState(state).settings;

export default getGroupsSettings;
