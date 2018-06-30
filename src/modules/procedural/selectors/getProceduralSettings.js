import getProceduralState from './getProceduralState';

/**
 * Selects the procedural settings.
 * @param {Object} state The global state
 * @returns {Object}
 */
const getProceduralSettings = (state) => getProceduralState(state).settings;

export default getProceduralSettings;
