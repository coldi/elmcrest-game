import memoize from '../../utils/memoize';
import getStacks from './getStacks';
import getItemStacksList from './getItemStacksList';

/**
 * Selects the unequipped stacks with item definitions as list for a given inventory id.
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @returns {Array} A list of stacks
 */
const getUnequippedStacksList = memoize(getStacks, (state, id) =>
    getItemStacksList(state, id).filter(stack => !stack.equipped)
);

export default getUnequippedStacksList;
