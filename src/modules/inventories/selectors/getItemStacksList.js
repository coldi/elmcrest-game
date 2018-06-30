import memoize from '../../utils/memoize';
import getStacks from './getStacks';
import getStacksList from './getStacksList';
import getPopulatedStack from './getPopulatedStack';

/**
 * Selects the stacks with populated props as list for a given inventory id.
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @returns {Array} The list of stacks with item types
 */
const getItemStacksList = memoize(
    getStacks,
    (state, id) => (
        getStacksList(state, id).map(stack => getPopulatedStack(state, stack))
    )
);

export default getItemStacksList;
