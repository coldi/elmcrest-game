import log from '../../utils/log';
import addLogMessage from '../../log/actions/addLogMessage';
import isMemberInCurrentPhase from '../../cycle/selectors/isMemberInCurrentPhase';
import isCoordWalkable from '../../world/selectors/isCoordWalkable';
import spendAPAction from '../../characters/actions/spendAPAction';
import getGroupById from '../selectors/getGroupById';
import getGroupsInView from '../selectors/getGroupsInView';
import hasGroupEnoughAP from '../selectors/hasGroupEnoughAP';
import isGroupOverloaded from '../selectors/isGroupOverloaded';
import isPlayerGroup from '../selectors/isPlayerGroup';
import moveGroupAction from '../actions/moveGroupAction';
import removeFromActionQueueAction from './removeFromActionQueueAction';
import setActionQueueAction from './setActionQueueAction';
import setGroupDoneAction from './setGroupDoneAction';
import setTempActionQueue from './setTempActionQueue';

const timeoutsById = {};

/**
 * Proceeds with the next action from the queue.
 * @param {string} groupId A group id
 * @returns {Function} A redux thunk
 */
const proceedWithActionQueue = groupId => (dispatch, getState) => {
    const state = getState();
    const group = getGroupById(state, groupId);
    const { actionQueue } = group;

    if (actionQueue.length) {
        const nextAction = actionQueue[0];
        const { cost } = nextAction.payload;

        if (isMemberInCurrentPhase(state, groupId)) {
            if (hasGroupEnoughAP(state, groupId, cost)) {
                if (!isGroupOverloaded(state, groupId)) {
                    // avoid moving to coords that could be blocked meanwhile
                    if (
                        nextAction.type === `${moveGroupAction}` &&
                        !isCoordWalkable(state, nextAction.payload.coord)
                    ) {
                        const { coord } = nextAction.payload;

                        if (isPlayerGroup(state, group.id)) {
                            dispatch(addLogMessage('ui.messages.blockedPath', { coord }));
                        } else {
                            log.warn(`Group '${groupId}' is blocked at: ${coord}`);
                        }

                        dispatch(setActionQueueAction(groupId, []));
                        dispatch(proceedWithActionQueue(groupId));
                        return;
                    }

                    dispatch(nextAction);
                    dispatch(spendAPAction(group.characterIds, cost));
                    dispatch(removeFromActionQueueAction(groupId));

                    if (isPlayerGroup(state, group.id)) {
                        // update temporary action queue
                        dispatch(setTempActionQueue(groupId));
                    }

                    const visibleGroups = getGroupsInView(state);
                    const delay = visibleGroups.some(({ id }) => id === groupId)
                        ? 300
                        : 50;

                    clearTimeout(timeoutsById[groupId]);
                    timeoutsById[groupId] = setTimeout(
                        () => dispatch(proceedWithActionQueue(groupId)),
                        delay
                    );
                } else if (isPlayerGroup(state, groupId)) {
                    dispatch(addLogMessage('ui.messages.noActionWhenOverloaded'));
                } else {
                    // other groups than player skip turn for now...
                    dispatch(setGroupDoneAction(groupId, true));
                }
            } else {
                // auto-trigger group isDone state if there
                // are not enough action points available
                dispatch(setGroupDoneAction(groupId, true));
            }
        } else {
            log.warn(`Phase violation by group id '${groupId}'.`);
        }
    } else if (!isPlayerGroup(state, groupId)) {
        // other groups than player skip turn for now...
        dispatch(setGroupDoneAction(groupId, true));
    }
};

export default proceedWithActionQueue;
