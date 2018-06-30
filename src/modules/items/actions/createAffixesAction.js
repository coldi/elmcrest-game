/**
 * Creates one or more affixes.
 * @param {Array} list A list of affixes
 * @returns {Object} A redux action
 */
const createAffixesAction = (list) => ({
    type: `${createAffixesAction}`,
    payload: {
        list: Array.isArray(list) ? list : [list],
    }
});

createAffixesAction.toString = () => 'items/create affixes';

export default createAffixesAction;
