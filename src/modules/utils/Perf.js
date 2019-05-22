/* eslint-disable  no-console */

let cachedTime = null;

/**
 * Calculates the delta in ms between now and the given time
 * @param {number} time A time in ms
 * @returns {number} The delta time in ms
 */
const getPerf = (time = cachedTime) => performance.now() - time;

/**
 * Resets the cached time.
 */
const reset = () => {
    cachedTime = null;
};

/**
 * Starts a measurement and caches and returns the current time.
 * @returns {number} The cached time
 */
const start = () => {
    if (cachedTime !== null) {
        console.warn(
            'You called start() multiple times without stop(). Make sure to use return value.'
        );
    }
    cachedTime = performance.now();
    return cachedTime;
};

/**
 * Stops a measurement and logs the result with a given optional subject and optional time.
 * @param {string} subject A given subject for the log.
 * @param {number} time A time in ms (uses the cached time by default)
 * @returns {*} The resulting time in ms
 */
const stop = (subject = 'Perf (ms):', time = cachedTime) => {
    if (time !== null) {
        const result = getPerf(time);
        console.log(subject, result);
        reset();
        return result;
    }
    console.warn('You need to call start() first.');
    return null;
};

export default { start, stop, reset };
