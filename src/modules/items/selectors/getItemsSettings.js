import getItemsState from './getItemsState';

/**
 * Selects the items settings.
 * @param {Object} state The global state
 * @returns {Object}
 */
const getItemsSettings = state => getItemsState(state).settings;

export default getItemsSettings;
