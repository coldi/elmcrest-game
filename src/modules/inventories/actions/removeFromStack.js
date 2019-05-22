import invariant from '../../utils/invariant';
import getStackById from '../selectors/getStackById';
import removeStackAction from './removeStackAction';
import updateStackAction from './updateStackAction';

/**
 * Decreases the amount of an inventory stack.
 * If the amount falls below 1, the stack gets removed.
 * @param {string} invId An inventory id
 * @param {string} stackId An item stack id
 * @param {number} amount The amount to decrease
 * @returns {Function} A redux thunk
 */
const removeFromStack = (invId, stackId, amount = 0) => (dispatch, getState) => {
    const stack = getStackById(getState(), invId, stackId);

    invariant(stack, `Inventory stack with id '${stackId}' does not exist.`);

    const newAmount = stack.amount - amount;
    if (newAmount > 0) {
        dispatch(updateStackAction(invId, stackId, { amount: newAmount }));
    } else {
        dispatch(removeStackAction(invId, stackId));
        return true;
    }

    return false;
};

export default removeFromStack;
