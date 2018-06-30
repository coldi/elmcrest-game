import curry from 'lodash/curry';
import invariant from './invariant';

/**
 * Creates a function that memoizes the result of func.
 * If resolver is provided, it determines the cache key for
 * storing the result based on the arguments provided to
 * the memoized function.
 * @param {Object} MapCache The used cache
 * @param {Function} resolver The key function
 * @param {Function} func The function to memoize
 * @returns {Function}
 */
const defaultMemoize = (MapCache, resolver, func) => {
    invariant(typeof resolver === 'function', 'Memoization expects resolver to be function.');
    invariant(typeof func === 'function', 'Memoization expects func to be function.');

    /* eslint-disable  func-names, prefer-rest-params */
    const memoizedFn = function() {
        const args = arguments;
        const cache = memoizedFn.cache;
        const key = resolver.apply(this, args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = func.apply(this, args);
        memoizedFn.cache = cache.set(key, result) || cache;

        return result;
    };
    /* eslint-enable  func-names, prefer-rest-params */

    memoizedFn.cache = new MapCache();

    return memoizedFn;
};

const memoizeWith = curry(defaultMemoize);

/**
 * Creates a memoize function that uses WeakMaps for caching.
 */
export default memoizeWith(WeakMap);

/**
 * Creates a memoize function that uses Maps for caching.
 * This may be used in cases where object references are not suitable.
 * Use with caution since stringification can be heavy.
 * @example
 * memoizeHash(
 *   (state, argToHash) =>
 *     memoizeHash.stringify(resolveState(state), argToHash),
 *   (state, argToHash) => { ... }
 * );
 */
export const memoizeHash = memoizeWith(Map);

/**
 * Returns a string hash of the passed arguments.
 * @param {*[]} args
 * @returns {string}
 */
memoizeHash.stringify = (...args) => args.reduce(
    (str, val) => `${str}_${JSON.stringify(val)}`,
    ''
);
