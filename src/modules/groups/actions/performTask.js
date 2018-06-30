import log from '../../utils/log';
import isMemberInCurrentPhase from '../../cycle/selectors/isMemberInCurrentPhase';
import getGroupById from '../selectors/getGroupById';
import setActionQueueAction from './setActionQueueAction';
import proceedWithActionQueue from './proceedWithActionQueue';
import setTempActionQueueAction from './setTempActionQueueAction';
import setTempActionQueue from './setTempActionQueue';

/**
 * Queues up group actions in order to interact with a given coord.
 * @param {string} id A group id
 * @param {number[]} coord The coord the group wants to interact with
 * @returns {Function} A redux thunk
 */
const performTask = (
    id,
    coord,
) => async (dispatch, getState) => {
    const state = getState();

    if (!isMemberInCurrentPhase(state, id)) {
        log.warn(`Cannot perform task for group '${id}' due to wrong cycle phase.`);
        return null;
    }

    const { tempActionQueue } = getGroupById(state, id);

    const actions = tempActionQueue.length
        // use existing temporary queue (player)
        ? tempActionQueue
        // create new temporary queue (npc)
        : await dispatch(setTempActionQueue(id, coord));

    // commit actions from temporary queue
    dispatch(setActionQueueAction(id, actions));
    // clear temporary queue
    dispatch(setTempActionQueueAction(id, []));
    // start with first action
    dispatch(proceedWithActionQueue(id));

    return actions;
};

export default performTask;
