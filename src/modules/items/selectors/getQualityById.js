import getItemsState from './getItemsState';

/**
 * Selects a quality by id.
 * @param {Object} state The global state
 * @param {string} id A quality id
 * @returns {Object} An item type object
 */
const getQualityById = (state, id) => (
    getItemsState(state).qualities[id]
);

export default getQualityById;
