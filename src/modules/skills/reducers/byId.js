import Immutable from 'seamless-immutable';
import registerSkillAction from '../actions/registerSkillAction';

/**
 * The skills state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function skills(state = {}, action = {}) {
    switch (action.type) {
        case `${registerSkillAction}`: {
            const { skill } = action.payload;

            return Immutable.set(state, skill.id, skill);
        }

        default:
            return state;
    }
}
