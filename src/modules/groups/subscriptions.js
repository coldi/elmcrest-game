import {
    turn$,
    playerPhase$,
    computePhase$,
} from '../cycle/streams';
import { coordSelected$, coordInteraction$ } from '../world/streams';
import { battleDidEnd$ } from '../combat/streams';
import { eventDidStart$ } from '../events/streams';
import {
    getGroupById,
    getPlayerGroup,
    setGroupDoneAction,
    proceedWithActionQueue,
    controlGroup,
    setTempActionQueue,
    removeGroup,
    removeFromActionQueueAction,
} from './';
import performTask from './actions/performTask';

/**
 * Subscription wrapper.
 * @param {Function} subscribe
 */
export default function (subscribe) {
    /**
     * Reset group's state on each new turn.
     */
    subscribe(turn$, ({ dispatch, getState, members }) => {
        members.forEach(({ groupId }) => {
            const group = getGroupById(getState(), groupId);

            if (group.actionQueue.length) {
                dispatch(removeFromActionQueueAction(groupId, null));
            }

            dispatch(setGroupDoneAction(groupId, false));
        });
    });

    /**
     * Auto-proceed with action queue upon player phase.
     */
    subscribe(playerPhase$, ({ dispatch, phaseMembers }) => {
        phaseMembers.forEach(({ groupId }) => {
            dispatch(proceedWithActionQueue(groupId));
        });
    });

    /**
     * Dispatch autonomic group actions upon comute phase.
     */
    subscribe(computePhase$, ({ dispatch, phaseMembers }) => {
        phaseMembers.forEach(({ groupId }) => dispatch(controlGroup(groupId)));
    });

    /**
     * Generate temporary action queue for player based on currently selected coord.
     */
    subscribe(
        coordSelected$.merge(playerPhase$),
        ({ dispatch, getState, coord }) => {
            const player = getPlayerGroup(getState());
            if (player) dispatch(setTempActionQueue(player.id, coord));
        }
    );

    /**
     * Generate temporary action queue for player based on currently selected coord.
     */
    subscribe(coordInteraction$, ({ dispatch, getState, coord }) => {
        const player = getPlayerGroup(getState());
        if (player) dispatch(performTask(player.id, coord));
    });

    /**
     * Evaluate battle result and show "game over" or remove enemy group.
     */
    subscribe(battleDidEnd$, ({ result, dispatch }) => {
        if (!result || result.victory === null) return;

        if (result.victory) {
            dispatch(removeGroup(result.loserGroupId, true));
        }
    });

    /**
     * Evaluate battle result and show "game over" or remove enemy group.
     */
    subscribe(eventDidStart$, ({ dispatch, getState }) => {
        const player = getPlayerGroup(getState());
        dispatch(removeFromActionQueueAction(player.id, null));
    });
}
