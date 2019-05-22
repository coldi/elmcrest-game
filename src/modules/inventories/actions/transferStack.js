import getCharacterByStackId from '../../characters/selectors/getCharacterByStackId';
import getStackById from '../selectors/getStackById';
import addItem from './addItem';
import removeFromStack from './removeFromStack';
import unequipStack from './unequipStack';

/**
 * Transfers a stack from one inventory to another.
 * @param {string} invId An inventory id
 * @param {string} stackId An item stack id
 * @param {string} targetInvId An inventory id
 * @returns {Function} A redux thunk
 */
const transferStack = (invId, stackId, targetInvId) => (dispatch, getState) => {
    const state = getState();
    const stack = getStackById(state, invId, stackId);

    const newStack = dispatch(addItem(targetInvId, stack.item, stack.amount));
    if (!newStack) {
        // could not transfer stack
        return false;
    }

    if (stack.equipped) {
        const char = getCharacterByStackId(state, stackId);
        if (char) dispatch(unequipStack(invId, stackId, char.id));
    }

    dispatch(removeFromStack(invId, stackId, newStack.amount));

    return true;
};

export default transferStack;
