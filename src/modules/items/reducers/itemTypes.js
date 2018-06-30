import createItemTypesAction from '../actions/createItemTypesAction';

/**
 * The item types state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function itemTypes (
    state = {},
    action = {}
) {
    switch (action.type) {

        case `${createItemTypesAction}`: {
            const { list } = action.payload;

            return list.reduce((obj, type) => ({
                ...obj,
                [type.id]: type
            }), state);
        }

        default: {
            return state;
        }

    }
}
