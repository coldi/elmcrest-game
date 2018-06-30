import createAffixesAction from '../actions/createAffixesAction';

/**
 * The affixes state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function affixes (
    state = {},
    action = {}
) {
    switch (action.type) {

        case `${createAffixesAction}`: {
            const { list } = action.payload;

            return list.reduce((obj, affix) => ({
                ...obj,
                [affix.id]: affix
            }), state);
        }

        default: {
            return state;
        }

    }
}
