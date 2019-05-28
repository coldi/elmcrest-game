import { turn$ } from '../cycle/streams';
import despawnGroups from './actions/despawnGroups';
import spawnGroups from './actions/spawnGroups';

/**
 * Subscription wrapper.
 * @param {Function} subscribe
 */
export default function(subscribe) {
    /**
     * Perform actions on each turn.
     */
    subscribe(turn$, ({ dispatch }) => {
        dispatch(despawnGroups());
        dispatch(spawnGroups());
    });
}
