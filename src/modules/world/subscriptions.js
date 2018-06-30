import { turn$ } from '../cycle/streams';
import { playerGroupMoved$ } from '../groups/streams';
import updateView from './actions/updateView';
import updateWeather from './actions/updateWeather';

/**
 * Subscription wrapper.
 * @param {Function} subscribe
 */
export default function (subscribe) {
    /**
     * When the player group moves, update map and related stuff.
     */
    subscribe(playerGroupMoved$, ({ dispatch }) => {
        dispatch(updateView());
        dispatch(updateWeather());
    });

    /**
     * Update weather on every new turn.
     */
    subscribe(turn$, ({ dispatch }) => {
        dispatch(updateWeather(true));
    });
}
