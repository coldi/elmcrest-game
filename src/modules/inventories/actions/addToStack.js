import invariant from '../../utils/invariant';
import getStackById from '../selectors/getStackById';
import updateStackAction from './updateStackAction';

/**
 * Increases the amount of an inventory stack.
 * @param {string} invId An inventory id
 * @param {string} stackId An item stack id
 * @param {number} amount The amount to increase
 * @returns {Function} A redux thunk
 */
const addToStack = (invId, stackId, amount = 0) => (dispatch, getState) => {
    const stack = getStackById(getState(), invId, stackId);

    invariant(stack, `Inventory stack with id '${stackId}' does not exist.`);

    const newAmount = stack.amount + amount;
    dispatch(updateStackAction(invId, stackId, { amount: newAmount }));
};

export default addToStack;
