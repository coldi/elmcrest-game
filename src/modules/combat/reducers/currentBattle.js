import setCurrentBattleAction from '../actions/setCurrentBattleAction';
import resetCombatAction from '../actions/resetCombatAction';

const initialState = {
    active: false,
    turn: 0,
    groups: [],
    characters: [],
};

/**
 * The currentBattle state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function currentBattle(state = initialState, action = {}) {
    switch (action.type) {
        case `${setCurrentBattleAction}`: {
            const { battle } = action.payload;

            if (battle) {
                return {
                    ...state,
                    active: true,
                    ...battle,
                };
            }

            return initialState;
        }

        case `${resetCombatAction}`: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}
