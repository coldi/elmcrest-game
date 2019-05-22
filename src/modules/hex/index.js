/**
 * This module is inspired by the awesome guide on hexagon grids by Amit Patel.
 * See http://www.redblobgames.com/grids/hexagons/ for further information.
 */

import Point from './Point';
import Coord from './Coord';
import Cell from './Cell';
import Layout from './Layout';

export { FLAT, POINTY } from './Layout';

/**
 * Constant that defines an even hexagon offset.
 * @type {number}
 */
export const EVEN = 1;

/**
 * Constant that defines an odd hexagon offset.
 * @type {number}
 */
export const ODD = -1;

/**
 * Shorthand to create Point from Array.
 * @returns {Point}
 */
export const getPoint = ([x, y]) => new Point(x, y);

/**
 * Shorthand to create Coord from 2D Array.
 * @returns {Coord}
 */
export const getCoord = ([col, row]) => new Coord(col, row);

/**
 * Shorthand to create Cell from 2D or 3D Array.
 * @param {number[]} arr An array with 2 or 3 numeric values
 * @returns {Cell}
 */
export const getCell = arr =>
    arr.length === 3 ? new Cell(...arr) : new Coord(...arr).toCell();

/**
 * Shorthand to create a Layout.
 * @param {number} size
 * @param {Object} orientation
 * @param {Point} origin
 * @returns {Layout}
 */
export const getLayout = (size, orientation, origin) =>
    new Layout(size, orientation, origin);
