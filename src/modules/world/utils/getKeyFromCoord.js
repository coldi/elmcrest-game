/**
 * Returns a key string representation of a given coord.
 * @param {number[]} coord A coord
 * @returns {string}
 */
const getKeyFromCoord = (coord) => {
    const [x, y] = coord;
    return `${x}_${y}`;
};

export default getKeyFromCoord;
