import Immutable from 'seamless-immutable';
import {
    createInventoryAction,
    createStackAction,
    updateStackAction,
    removeStackAction,
    removeInventoryAction,
} from '../';

/**
 * The inventories state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function inventories(state = {}, action = {}) {
    switch (action.type) {
        case `${createInventoryAction}`: {
            const { inventory } = action.payload;
            return Immutable.setIn(state, [inventory.id], inventory);
        }

        case `${createStackAction}`: {
            const { id, stack } = action.payload;
            return Immutable.setIn(state, [id, 'stacks', stack.id], stack);
        }

        case `${updateStackAction}`: {
            const { id, stackId, props } = action.payload;
            return Immutable.updateIn(state, [id, 'stacks', stackId], stack => ({
                ...stack,
                ...props,
            }));
        }

        case `${removeStackAction}`: {
            const { id, stackId } = action.payload;
            const { stacks } = state[id];

            return Immutable.setIn(
                state,
                [id, 'stacks'],
                Immutable.without(stacks, stackId)
            );
        }

        case `${removeInventoryAction}`: {
            const { id } = action.payload;
            return Immutable.without(state, id);
        }

        default: {
            return state;
        }
    }
}
