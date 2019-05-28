import invariant from '../../utils/invariant';
import getItemTypeById from '../../items/selectors/getItemTypeById';
import consumeItem from '../../characters/actions/consumeItem';
import getStackById from '../selectors/getStackById';
import removeFromStack from './removeFromStack';

/**
 * Consumes a stack item by a character.
 * @param {string} invId An inventory id
 * @param {string} stackId An item stack id
 * @param {string} charId A character id
 * @returns {Function} A redux thunk
 */
const consumeFromStack = (invId, stackId, charId) => (dispatch, getState) => {
    const state = getState();
    const stack = getStackById(state, invId, stackId);
    const itemType = getItemTypeById(state, stack.item.itemTypeId);

    invariant(itemType.consumable, `Cannot consume item '${itemType.id}'.`);

    dispatch(consumeItem(charId, stack.item));
    dispatch(removeFromStack(invId, stackId, 1));

    return getStackById(getState(), invId, stackId);
};

export default consumeFromStack;
