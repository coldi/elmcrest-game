import memoize from '../../utils/memoize';
import getStacks from './getStacks';
import getStacksList from './getStacksList';
import getStackSize from './getStackSize';

/**
 * Gets the used capacity of all item stacks of a given inventory.
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @returns {number}
 */
const getHoldCapacity = memoize(getStacks, (state, id) =>
    getStacksList(state, id)
        .filter(stack => !stack.equipped)
        .reduce((totalSize, stack) => totalSize + getStackSize(state, id, stack.id), 0)
);

export default getHoldCapacity;
