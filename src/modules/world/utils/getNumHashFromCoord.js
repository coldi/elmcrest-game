/**
 * Returns a single unique numeric representation of a given coord.
 * Might be a negative number as well.
 * @param {number[]} coord A coord
 * @returns {number}
 */
const getNumHashFromCoord = (coord) => {
    const [x, y] = coord;
    const tmp = (y + ((x + 1) / 2));
    return (x + (tmp * tmp)) * 100;
};

export default getNumHashFromCoord;
