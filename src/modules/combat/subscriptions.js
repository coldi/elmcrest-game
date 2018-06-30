import { getGroupByCoord } from '../groups';
import { playerGroupAttacked$ } from '../groups/streams';
import { startBattle } from './';

/**
 * Subscription wrapper.
 * @param {Function} subscribe
 */
export default function (subscribe) {
    /**
     * Starts a battle when player performed an attack action.
     */
    subscribe(playerGroupAttacked$, ({ dispatch, getState, action, groupId }) => {
        const { coord } = action.payload;
        const opponent = getGroupByCoord(getState(), coord);

        dispatch(startBattle(groupId, opponent.id, groupId));
    });
}
