import getWorldState from './getWorldState';

/**
 * Selects the world settings.
 * @param {Object} state The global state
 * @returns {Object}
 */
const getWorldSettings = state => getWorldState(state).settings;

export default getWorldSettings;
