import getItemsState from './getItemsState';

/**
 * Selects an item type by id.
 * @param {Object} state The global state
 * @param {string} id An item id
 * @returns {Object} An item type object
 */
const getItemTypeById = (state, id) => (
    getItemsState(state).itemTypes[id]
);

export default getItemTypeById;
