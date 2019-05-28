import { createModalAction, removeModalAction } from '../';

/**
 * The modals state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function modals(state = [], action = {}) {
    switch (action.type) {
        case `${createModalAction}`: {
            const { modal } = action.payload;
            return [...state, modal];
        }

        case `${removeModalAction}`: {
            const { id } = action.payload;
            return state.filter(modal => modal.id !== id);
        }

        default: {
            return state;
        }
    }
}
