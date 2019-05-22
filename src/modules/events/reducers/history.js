import { addEventToHistoryAction } from '../';

/**
 * The event history state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function history(state = [], action = {}) {
    switch (action.type) {
        case `${addEventToHistoryAction}`: {
            const { event } = action.payload;

            return [event].concat(state);
        }

        default: {
            return state;
        }
    }
}
