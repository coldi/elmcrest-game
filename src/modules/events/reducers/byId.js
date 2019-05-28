import Immutable from 'seamless-immutable';
import registerEventAction from '../actions/registerEventAction';

/**
 * The events state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function events(state = {}, action = {}) {
    switch (action.type) {
        case `${registerEventAction}`: {
            const { event } = action.payload;

            return Immutable.set(state, event.id, event);
        }

        default:
            return state;
    }
}
