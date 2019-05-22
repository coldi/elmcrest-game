import getInventoriesState from './getInventoriesState';

/**
 * Selects the inventories settings.
 * @param {Object} state The global state
 * @returns {Object}
 */
const getInventoriesSettings = state => getInventoriesState(state).settings;

export default getInventoriesSettings;
