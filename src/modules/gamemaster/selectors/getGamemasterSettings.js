import getGamemasterState from './getGamemasterState';

/**
 * Selects the gamemaster settings.
 * @param {Object} state The global state
 * @returns {Object}
 */
const getGamemasterSettings = (state) => getGamemasterState(state).settings;

export default getGamemasterSettings;
