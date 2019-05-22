import getProceduralSettings from './getProceduralSettings';

/**
 * Selects the seed.
 * @param {Object} state The global state
 * @returns {Object}
 */
const getSeed = state => getProceduralSettings(state).seed;

export default getSeed;
