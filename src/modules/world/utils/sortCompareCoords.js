import { getCell } from '../../hex';

/**
 * Provides sorting comparator for proper draw order in the grid view.
 * @param {number[]} a One Coord
 * @param {number[]} b Other Coord
 * @returns {number}
 */
const sortCompareCoords = (a, b) => {
    const c1 = getCell(a);
    const c2 = getCell(b);
    return (c1.x - (c2.y - c1.y)) - (c2.x - (c1.y - c2.y));
};

export default sortCompareCoords;
