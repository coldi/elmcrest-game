import { setWindowActiveAction, updateWindowStateAction } from '../';

const initialState = {
    devTool: { active: false },
    character: { active: false },
    inventory: {
        active: false,
        selectedStackId: null,
    },
    skills: { active: false },
};

/**
 * The windows UI state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function windows(state = initialState, action = {}) {
    switch (action.type) {
        case `${setWindowActiveAction}`: {
            const { id, active } = action.payload;

            // enables window with given id, disables others
            return Object.keys(state).reduce(
                (nextState, key) => ({
                    ...nextState,
                    [key]: {
                        ...state[key],
                        active: key === id ? active : false,
                    },
                }),
                {}
            );
        }

        case `${updateWindowStateAction}`: {
            const { id, stateUpdate } = action.payload;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    ...stateUpdate,
                },
            };
        }

        default: {
            return state;
        }
    }
}
