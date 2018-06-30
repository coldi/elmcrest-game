import createQualitiesAction from '../actions/createQualitiesAction';

/**
 * The qualities state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function qualities (
    state = {},
    action = {}
) {
    switch (action.type) {

        case `${createQualitiesAction}`: {
            const { list } = action.payload;

            return list.reduce((obj, quality) => ({
                ...obj,
                [quality.id]: quality
            }), state);
        }

        default: {
            return state;
        }

    }
}
