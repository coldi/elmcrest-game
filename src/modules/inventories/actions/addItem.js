import invariant from '../../utils/invariant';
import getItemTypeById from '../../items/selectors/getItemTypeById';
import { itemDefaults } from '../../items/definitions';
import getInventoryById from '../selectors/getInventoryById';
import getStackOfItem from '../selectors/getStackOfItem';
import createStack from './createStack';
import addToStack from './addToStack';

/**
 * Adds an item stack to an inventory.
 * @param {string} invId An inventory id
 * @param {Object|string} itemOrTypeId The item props or a type id
 * @param {number} [amount] An optional amount
 * @returns {Function} A redux thunk
 */
const addItem = (
    invId,
    itemOrTypeId,
    amount = 1,
) => (dispatch, getState) => {
    const state = getState();
    const inventory = getInventoryById(state, invId);
    const item = typeof itemOrTypeId === 'string'
        ? { ...itemDefaults, itemTypeId: itemOrTypeId }
        : { ...itemDefaults, ...itemOrTypeId };
    const itemType = getItemTypeById(state, item.itemTypeId);

    invariant(itemType, `Item type with id '${item.itemTypeId}' does not exist.`);

    let stack;
    let amountToAdd;

    // only stack items if they are not wearable (no equip)
    if (!itemType.slot || inventory.forceStacks) {
        stack = getStackOfItem(state, invId, item);

        if (stack) {
            // TODO: validate amount with capacity
            amountToAdd = amount;

            dispatch(addToStack(invId, stack.id, amountToAdd));
        }
    }

    // either no stack found or item can not be stacked.
    // therefore create a new stack.
    if (!stack) {
        // limit amount to 1 for wearable items
        if (item.slot) {
            amountToAdd = 1;
        }

        // TODO: validate amount with capacity
        amountToAdd = amountToAdd || amount;

        stack = dispatch(createStack(invId, { item, amount: amountToAdd }));
    }

    // TODO: check if capacity is at max?

    return stack;
};

export default addItem;
