/**
 * Decreases the action points of one or more given characters by id.
 * @param {string|string[]} ids A character id or a list of character ids
 * @param {number} cost Action point cost
 * @returns {Object} A redux action
 */
const spendAPAction = (
    ids = [],
    cost = 0
) => ({
    type: `${spendAPAction}`,
    payload: {
        ids: (Array.isArray(ids)) ? ids : [ids],
        cost,
    }
});

spendAPAction.toString = () => 'characters/spend AP';

export default spendAPAction;
