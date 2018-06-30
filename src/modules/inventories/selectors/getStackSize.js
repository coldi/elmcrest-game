import getItemTypeById from '../../items/selectors/getItemTypeById';
import getStackById from './getStackById';

/**
 * Gets the total size of an item stack.
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @param {string} stackId A stack id
 * @returns {number}
 */
const getStackSize = (state, id, stackId) => {
    const { amount, item } = getStackById(state, id, stackId);
    const { size = 0 } = getItemTypeById(state, item.itemTypeId);
    return size * amount;
};

export default getStackSize;
