import selectCharacterIdAction from '../actions/selectCharacterIdAction';
import setUIActiveAction from '../actions/setUIActiveAction';
import setUIVisibleAction from '../actions/setUIVisibleAction';

const initialState = {
    active: true,
    visible: true,
    selectedCharacterId: null,
};

/**
 * The general UI state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function general (
    state = initialState,
    action = {}
) {
    switch (action.type) {

        case `${selectCharacterIdAction}`: {
            const { id } = action.payload;
            return { ...state, selectedCharacterId: id };
        }

        case `${setUIActiveAction}`: {
            const { active } = action.payload;
            return { ...state, active };
        }

        case `${setUIVisibleAction}`: {
            const { visible } = action.payload;
            return { ...state, visible };
        }

        default: {
            return state;
        }

    }
}
