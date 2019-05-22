const date = Date.now();

/**
 * Returns the current timestamp based on performance.now precision.
 * @returns {number}
 */
const timestamp = () => {
    const now =
        typeof performance !== 'undefined'
            ? // browser env
              () => performance.now()
            : // node env
              () => {
                  const t = process.hrtime();
                  return t[0] + t[1] / 10000;
              };

    return date + now();
};

/**
 * Generates a time-based string of [0-9,a-z], e.g. "h7d3xd8z".
 * @returns {string}
 */
const s36 = () =>
    Math.floor((1 + timestamp()) * 0x100)
        .toString(36)
        .substring(2);

/**
 * Generates a 3-digit random number.
 * @returns {number}
 */
const rnd = () => Math.floor(100 + Math.random() * 899);

/**
 * Generates an unique id with an optional prefix.
 * @param {string} [prefix]
 * @returns {string}
 */
const uid = (prefix = null) =>
    prefix === null ? `${s36()}-${rnd()}` : `${prefix}-${s36()}-${rnd()}`;

export default uid;
