/**
 * Resets the action points of one or more given characters by id.
 * @param {string|string[]} ids A character id or a list of character ids
 * @returns {Object} A redux action
 */
const resetAPAction = (
    ids = []
) => ({
    type: `${resetAPAction}`,
    payload: {
        ids: (Array.isArray(ids)) ? ids : [ids],
    }
});

resetAPAction.toString = () => 'characters/reset AP';

export default resetAPAction;
