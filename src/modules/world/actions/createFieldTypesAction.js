/**
 * Creates one or more field types.
 * @param {Array} list A list of field types
 * @returns {Object} A redux action
 */
const createFieldTypesAction = list => ({
    type: `${createFieldTypesAction}`,
    payload: {
        list: Array.isArray(list) ? list : [list],
    },
});

createFieldTypesAction.toString = () => 'world/create field types';

export default createFieldTypesAction;
