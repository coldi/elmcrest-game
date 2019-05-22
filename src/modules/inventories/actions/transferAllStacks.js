import getItemStacksList from '../selectors/getItemStacksList';
import transferStack from './transferStack';

/**
 * Transfers all stacks from one inventory to another.
 * @param {string} invId An inventory id
 * @param {string} targetInvId An inventory id
 * @returns {Function} A redux thunk
 */
const transferAllStacks = (invId, targetInvId) => (dispatch, getState) =>
    getItemStacksList(getState(), invId)
        .map(stack => dispatch(transferStack(invId, stack.id, targetInvId)))
        .every(success => success);

export default transferAllStacks;
