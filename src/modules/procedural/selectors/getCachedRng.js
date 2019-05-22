import makeCachedRng from '../utils/makeCachedRng';
import getSeed from './getSeed';

/**
 * Returns a cached instance of the RNG.
 * @param {Object} state The global state
 * @returns {Object}
 */
const getCachedRng = state => makeCachedRng(getSeed(state));

export default getCachedRng;
