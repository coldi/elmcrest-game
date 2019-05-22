import memoize from '../../utils/memoize';
import getStacks from './getStacks';

/**
 * Selects the stacks of a given inventory id as list.
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @returns {Array} The list of stacks
 */
const getStacksList = memoize(getStacks, (state, id) =>
    Object.values(getStacks(state, id))
);

export default getStacksList;
