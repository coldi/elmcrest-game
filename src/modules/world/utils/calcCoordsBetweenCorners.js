import min from 'lodash/min';
import max from 'lodash/max';
import invariant from '../../utils/invariant';

/**
 * Calculates a list of coords that are included
 * in the rectangle shape described by the given corners.
 * Does not support trapezoidal shapes.
 * @param {Array[]} corners A list of four corners describing a rectangle
 * @param {number} offset An optional offset to the rectangle shape
 * @returns {Array[]} A list of coords
 */
const calcCoordsBetweenCorners = (corners = [], offset = 0) => {
    invariant(
        corners.length === 4,
        `Expected a list of 4 corners, but received ${corners.length}.`
    );

    const xAxis = corners.map(([x]) => x);
    const yAxis = corners.map(([, y]) => y);

    // values need to be int (rounded)
    const startX = Math.round(min(xAxis) - offset);
    const startY = Math.round(min(yAxis) - offset);
    const endX = Math.round(max(xAxis) + offset);
    const endY = Math.round(max(yAxis) + offset);

    const coords = [];

    const incX = startX < endX ? 1 : -1;
    const incY = startY < endY ? 1 : -1;

    // iterate through coords in rectangle form
    let y = startY;
    while (y !== endY) {
        // consider hexagonal offset when pushing coords
        for (let off = 0; off < 2; off += 1) {
            let x = startX;
            while (x !== endX) {
                if (Math.abs(x % 2) === off) {
                    coords.push([x, y]);
                }
                x += incX;
            }
        }
        y += incY;
    }

    return coords;
};

export default calcCoordsBetweenCorners;
