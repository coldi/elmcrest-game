import memoize from '../../utils/memoize';
import getStacks from './getStacks';
import getItemStacksList from './getItemStacksList';

/**
 * Selects the equipped stacks with item definitions as list for a given inventory id.
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @returns {Array} A list of stacks
 */
const getEquippedStacksList = memoize(getStacks, (state, id) =>
    getItemStacksList(state, id).filter(stack => stack.equipped)
);

export default getEquippedStacksList;
