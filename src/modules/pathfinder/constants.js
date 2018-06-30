/**
 * The Maximum distance allowed between origin and destination.
 * @type {number}
 */
export const MAX_DISTANCE = 50;

/**
 * Minimum search radius (in cells).
 * @type {number}
 */
export const MIN_SEARCH_RADIUS = 15;

/**
 * A multiplier for the calculated search radius
 * in order to search for a path a little further than just a -> b distance.
 * @type {number}
 */
export const SEARCH_RADUIS_MULTIPLIER = 1.25;

/**
 * The number of neighbor fields.
 * @type {number}
 */
export const NUM_NEIGHBORS = 6;

/**
 * The number of iterations in path calculation within a single process tick.
 * @type {number|Infinity}
 */
export const ITERATIONS_PER_CALCULATION = 50;
