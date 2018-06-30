import Immutable from 'seamless-immutable';

import {
    createGroupAction,
    addCharacterAction,
    removeCharacterAction,
    removeGroupAction,
    moveGroupAction,
    setActionQueueAction,
    removeFromActionQueueAction,
    setGroupDoneAction,
    setTempActionQueueAction,
} from '../';

/**
 * The groups state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function groups (
    state = {},
    action = {}
) {
    switch (action.type) {

        case `${createGroupAction}`: {
            const { group } = action.payload;

            return Immutable.set(state, group.id, group);
        }

        case `${addCharacterAction}`: {
            const { groupId, characterId } = action.payload;

            return Immutable.updateIn(
                state,
                [groupId, 'characterIds'],
                (list) => list.concat([characterId])
            );
        }

        case `${removeCharacterAction}`: {
            const { groupId, characterId } = action.payload;

            return Immutable.updateIn(
                state,
                [groupId, 'characterIds'],
                (list) => list.filter((id) => id !== characterId)
            );
        }

        case `${removeGroupAction}`: {
            const { id } = action.payload;

            return state.without(id);
        }

        case `${moveGroupAction}`: {
            const { id, coord } = action.payload;

            return Immutable.setIn(state, [id, 'coord'], coord);
        }

        case `${setGroupDoneAction}`: {
            const { id, isDone } = action.payload;

            return Immutable.setIn(state, [id, 'isDone'], isDone);
        }

        case `${setActionQueueAction}`: {
            const { id, actions } = action.payload;

            return Immutable.setIn(
                state,
                [id, 'actionQueue'],
                actions
            );
        }

        case `${removeFromActionQueueAction}`: {
            const { id, index } = action.payload;

            if (index === null) {
                // clear all
                return Immutable.setIn(state, [id, 'actionQueue'], []);
            }

            // remove index
            return Immutable.updateIn(
                state,
                [id, 'actionQueue'],
                (queue) => queue.filter((item, i) => i !== index)
            );
        }

        case `${setTempActionQueueAction}`: {
            const { id, actions } = action.payload;

            return Immutable.setIn(
                state,
                [id, 'tempActionQueue'],
                actions
            );
        }

        default:
            return state;
    }
}
