import { MESSAGE_LIMIT } from '../constants';
import { addMessageAction } from '../';

/**
 * The log state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function log(state = [], action = {}) {
    switch (action.type) {
        case `${addMessageAction}`: {
            const { message } = action.payload;
            return state.concat([message]).slice(-MESSAGE_LIMIT);
        }

        default: {
            return state;
        }
    }
}
