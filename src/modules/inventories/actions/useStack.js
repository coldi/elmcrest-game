import log from '../../utils/log';
import getItemTypeById from '../../items/selectors/getItemTypeById';
import getStackById from '../selectors/getStackById';
import consumeFromStack from './consumeFromStack';
import equipStack from './equipStack';

/**
 * Consumes a stack item by a character.
 * @param {string} invId An inventory id
 * @param {string} stackId An item stack id
 * @param {string} charId A character id
 * @returns {Function} A redux thunk
 */
const useStack = (
    invId,
    stackId,
    charId,
) => (dispatch, getState) => {
    const state = getState();
    const stack = getStackById(state, invId, stackId);
    const itemType = getItemTypeById(state, stack.item.itemTypeId);

    if (itemType.consumable) {
        return dispatch(consumeFromStack(invId, stackId, charId));
    }

    if (itemType.slot) {
        return dispatch(equipStack(invId, stackId, charId));
    }

    log.warn(`Unable to use item '${itemType.id}' properly.`);

    return null;
};

export default useStack;
