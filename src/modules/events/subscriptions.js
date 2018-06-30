import { playerGroupMoved$ } from '../groups/streams';
import { coordInteraction$, mapDidUpdate$ } from '../world/streams';
import compareCoords from '../world/utils/compareCoords';
import getEventByCoord from './selectors/getEventByCoord';
import createEventsByFields from './actions/createEventsByFields';
import startEvent from './actions/startEvent';

/**
 * Subscription wrapper.
 * @param {Function} subscribe
 */
export default function (subscribe) {
    /**
     * When the map updates, add events accordingly.
     */
    subscribe(mapDidUpdate$, ({ dispatch, fields }) => {
        dispatch(createEventsByFields(fields));
    });

    /**
     * When the player moved to a coord that contains an event, start it.
     */
    subscribe(playerGroupMoved$, ({ dispatch, getState, coord }) => {
        const event = getEventByCoord(getState(), coord);
        if (event && event.active) {
            dispatch(startEvent(event.id, coord));
        }
    });

    /**
     * When the player clicks on the coord he's currently standing
     * and that coord contains an event, start it.
     */
    subscribe(
        coordInteraction$.withLatestFrom(playerGroupMoved$),
        ([{ dispatch, getState, coord }, playerMoved]) => {
            if (!compareCoords(coord, playerMoved.coord)) return;

            const event = getEventByCoord(getState(), coord);
            if (event && event.active) {
                dispatch(startEvent(event.id, coord));
            }
        }
    );
}
