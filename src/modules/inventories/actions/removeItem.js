import log from '../../utils/log';
import getStackOfItem from '../selectors/getStackOfItem';
import removeFromStack from './removeFromStack';

/**
 * Removes an amount of items from an inventory.
 * @param {string} invId An inventory id
 * @param {string} item An item object
 * @param {number} [amount=1] The amount of items
 * @returns {Function} A redux thunk
 */
const removeItem = (
    invId,
    item,
    amount = 1,
) => (dispatch, getState) => {
    const stack = getStackOfItem(getState(), invId, item);

    if (!stack) {
        log.warn(`Inventory does not contain stack of item with itemTypeId '${item.itemTypeId}'.`, item);
    }

    dispatch(removeFromStack(invId, stack.id, amount));
};

export default removeItem;
