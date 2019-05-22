import curry from 'lodash/curry';

/**
 * Simply compares the values of two coords and returns true if they are equal.
 * @param {number[]} a One Coord
 * @param {number[]} b Other Coord
 * @returns {boolean}
 */
const compareCoords = curry((a, b) => a[0] === b[0] && a[1] === b[1]);

export default compareCoords;
