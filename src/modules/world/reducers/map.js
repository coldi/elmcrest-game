import getKeyFromCoord from '../utils/getKeyFromCoord';
import mergeMapFieldsAction from '../actions/mergeMapFieldsAction';

/**
 * The map state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function map (
    state = {},
    action
) {
    switch (action.type) {
        case `${mergeMapFieldsAction}`: {
            const { fields } = action.payload;

            const stateUpdate = fields.reduce((update, field) => {
                /* eslint-disable  no-param-reassign */
                const key = getKeyFromCoord(field.coord);
                if (state[key] !== undefined) {
                    // merge field
                    update[key] = { ...state[key], ...field };
                } else {
                    // add new field
                    update[key] = field;
                }

                return update;
                /* eslint-enable  no-param-reassign */
            }, {});

            return {
                ...state,
                ...stateUpdate,
            };
        }

        default: {
            return state;
        }
    }
}
