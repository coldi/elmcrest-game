/**
 * Creates one or more qualities.
 * @param {Array} list A list of qualities
 * @returns {Object} A redux action
 */
const createQualitiesAction = list => ({
    type: `${createQualitiesAction}`,
    payload: {
        list: Array.isArray(list) ? list : [list],
    },
});

createQualitiesAction.toString = () => 'items/create qualities';

export default createQualitiesAction;
