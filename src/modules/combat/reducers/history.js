import addBattleToHistoryAction from '../actions/addBattleToHistoryAction';

/**
 * The combat history state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function history (
    state = [],
    action = {}
) {
    switch (action.type) {

        case `${addBattleToHistoryAction}`: {
            const { result } = action.payload;

            return [result].concat(state);
        }

        default: {
            return state;
        }

    }
}
