import createFieldTypesAction from '../actions/createFieldTypesAction';

/**
 * The field types state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function resources (
    state = {},
    action
) {
    switch (action.type) {
        case `${createFieldTypesAction}`: {
            const { list } = action.payload;

            return list.reduce((obj, type) => {
                const key = `${type.climate}_${type.elevation}`;
                return { ...obj, [key]: type };
            }, state);
        }

        default: {
            return state;
        }
    }
}
