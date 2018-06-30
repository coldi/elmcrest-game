/**
 * Creates one or more item types.
 * @param {Array} list A list of item types
 * @returns {Object} A redux action
 */
const createItemTypesAction = (list) => ({
    type: `${createItemTypesAction}`,
    payload: {
        list: Array.isArray(list) ? list : [list],
    }
});

createItemTypesAction.toString = () => 'items/create item types';

export default createItemTypesAction;
