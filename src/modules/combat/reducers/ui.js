import setControlledGroupIdAction from '../actions/setControlledGroupIdAction';
import makeSelectionAction from '../actions/makeSelectionAction';
import resetSelectionAction from '../actions/resetSelectionAction';
import addRolloutAction from '../actions/addRolloutAction';
import removeRolloutAction from '../actions/removeRolloutAction';
import showResultAction from '../actions/showResultAction';
import resetCombatAction from '../actions/resetCombatAction';

const initialState = {
    controlledGroupId: null,
    selection: {
        skillId: null,
        characterId: null,
    },
    rollouts: [],
    showResult: false,
};

/**
 * The battle ui state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function ui(state = initialState, action = {}) {
    switch (action.type) {
        case `${setControlledGroupIdAction}`: {
            const { groupId } = action.payload;

            return {
                ...state,
                controlledGroupId: groupId,
            };
        }

        case `${makeSelectionAction}`: {
            const { key, value } = action.payload;

            if (key in state.selection) {
                return {
                    ...state,
                    selection: {
                        ...state.selection,
                        [key]: value,
                    },
                };
            }

            return state;
        }

        case `${resetSelectionAction}`: {
            return {
                ...state,
                selection: initialState.selection,
            };
        }

        case `${addRolloutAction}`: {
            const { rollout } = action.payload;

            return {
                ...state,
                rollouts: [...state.rollouts, rollout],
            };
        }

        case `${removeRolloutAction}`: {
            return {
                ...state,
                rollouts: state.rollouts.slice(1),
            };
        }

        case `${showResultAction}`: {
            const { active } = action.payload;

            return {
                ...state,
                showResult: active,
            };
        }

        case `${resetCombatAction}`: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}
