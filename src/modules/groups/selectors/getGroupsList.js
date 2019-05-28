import memoize from '../../utils/memoize';
import getGroupsState from './getGroupsState';

/**
 * Selects the groups state as a list.
 * @param {Object} state The global state
 * @returns {Array} A list of groups
 */
const getGroupsList = memoize(getGroupsState, state =>
    Object.values(getGroupsState(state).byId)
);

export default getGroupsList;
