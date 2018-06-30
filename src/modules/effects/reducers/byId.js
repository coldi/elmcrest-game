import Immutable from 'seamless-immutable';
import registerEffectAction from '../actions/registerEffectAction';

/**
 * The effects state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function effects (
    state = {},
    action = {}
) {
    switch (action.type) {
        case `${registerEffectAction}`: {
            const { effect } = action.payload;

            return Immutable.set(state, effect.id, effect);
        }

        default:
            return state;
    }
}
