import { memoizeHash } from '../../utils/memoize';
import makeRng from './makeRng';

/**
 * Returns the a memoized instance of RNG for the given seed.
 * @param {string|number} seed A seed value
 * @returns {Object}
 */
const makeCachedRng = memoizeHash(
    seed => seed,
    seed => makeRng(seed)
);

export default makeCachedRng;
