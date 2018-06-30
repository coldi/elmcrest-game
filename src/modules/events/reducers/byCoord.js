import Immutable from 'seamless-immutable';
import getKeyFromCoord from '../../world/utils/getKeyFromCoord';
import createEventAtCoordAction from '../actions/createEventAtCoordAction';
import updateEventAtCoordAction from '../actions/updateEventAtCoordAction';

/**
 * The events state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function events (
    state = {},
    action = {}
) {
    switch (action.type) {
        case `${createEventAtCoordAction}`: {
            const { event } = action.payload;

            return Immutable.set(state, getKeyFromCoord(event.coord), event);
        }

        case `${updateEventAtCoordAction}`: {
            const { event } = action.payload;

            return Immutable.update(state, getKeyFromCoord(event.coord), (prevEvent) => ({
                ...prevEvent,
                ...event,
            }));
        }

        default:
            return state;
    }
}
