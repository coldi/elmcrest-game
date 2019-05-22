import Immutable from 'seamless-immutable';
import {
    addGroupToPhaseAction,
    setPhaseIndexAction,
    incrementTurnAction,
    removeGroupFromPhaseAction,
} from '../';

const initialState = {
    turn: 0,
    phaseIndex: 0,
    phases: [[], []],
};

/**
 * The cycle state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function cycle(state = initialState, action = {}) {
    switch (action.type) {
        case `${addGroupToPhaseAction}`: {
            const { groupId, phaseIndex } = action.payload;
            const phase = state.phases[phaseIndex].concat([{ groupId }]);

            return Immutable.setIn(state, ['phases', phaseIndex], phase);
        }

        case `${removeGroupFromPhaseAction}`: {
            const { groupId, phaseIndex } = action.payload;
            const phase = state.phases[phaseIndex].filter(
                member => member.groupId !== groupId
            );

            return Immutable.setIn(state, ['phases', phaseIndex], phase);
        }

        case `${setPhaseIndexAction}`: {
            const { phaseIndex } = action.payload;
            return Immutable.set(state, 'phaseIndex', phaseIndex);
        }

        case `${incrementTurnAction}`: {
            return Immutable.merge(state, {
                // increase turn counter
                turn: state.turn + 1,
                // and reset phase index
                phaseIndex: 0,
            });
        }

        default: {
            return state;
        }
    }
}
