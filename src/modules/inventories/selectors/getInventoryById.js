import getInventoriesState from './getInventoriesState';

/**
 * Selects an inventory by id.
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @returns {Object} An inventory object
 */
const getInventoryById = (state, id) => (
    getInventoriesState(state).byId[id]
);

export default getInventoryById;
