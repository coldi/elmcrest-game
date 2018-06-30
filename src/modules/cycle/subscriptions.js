import { isPlayerGroup } from '../groups';
import { PLAYER_PHASE_INDEX, COMPUTE_PHASE_INDEX } from './constants';
import { groupCreated$, groupDone$, groupRemoved$ } from '../groups/streams';
import {
    addGroupToPhaseAction,
    removeGroupFromPhaseAction,
    getPhaseDoneState,
    nextPhase,
} from './';

/**
 * Subscription wrapper.
 * @param {Function} subscribe
 */
export default function (subscribe) {
    /**
     * When a new group was created, add it to a phase.
     */
    subscribe(groupCreated$, ({ group, dispatch, getState }) => {
        if (isPlayerGroup(getState(), group.id)) {
            dispatch(addGroupToPhaseAction(group.id, PLAYER_PHASE_INDEX));
        } else {
            dispatch(addGroupToPhaseAction(group.id, COMPUTE_PHASE_INDEX));
        }
    });

    /**
     * When a group is done with it's phase,
     * check if all groups of this phase are done.
     */
    subscribe(groupDone$, ({ dispatch, getState }) => {
        if (getPhaseDoneState(getState())) {
            // all done, start next phase
            dispatch(nextPhase());
        }
    });

    /**
     * When a group is removed, remove it from it's phase as well.
     */
    subscribe(groupRemoved$, ({ groupId, dispatch, getState }) => {
        if (isPlayerGroup(getState(), groupId)) {
            dispatch(removeGroupFromPhaseAction(groupId, PLAYER_PHASE_INDEX));
        } else {
            dispatch(removeGroupFromPhaseAction(groupId, COMPUTE_PHASE_INDEX));
        }
    });
}
