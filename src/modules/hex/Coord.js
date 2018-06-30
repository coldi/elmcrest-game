import Cell from './Cell';

/* eslint-disable  no-mixed-operators */
/* eslint-disable  import/prefer-default-export */

/**
 * An offset coordinate within a hexagonal grid.
 * See http://www.redblobgames.com/grids/hexagons/#coordinates
 */
export default class Coord {

    /**
     * Constructor.
     * @param {number} col
     * @param {number} row
     */
    constructor(
        col = 0,
        row = 0
    ) {
        this.col = col;
        this.row = row;
    }

    /**
     * Adds the values from a given coord or number and returns a new coord.
     * @param {Coord|number} c The coord or number to add
     * @returns {Coord}
     */
    add (c) {
        if (c instanceof Coord) {
            return new Coord(this.col + c.col, this.row + c.row);
        }
        return new Coord(this.col + c, this.row + c);
    }

    /**
     * Subtracts the values from a given coord or number and returns a new coord.
     * @param {Coord|number} c The coord or number to subtract
     * @returns {Coord}
     */
    sub (c) {
        if (c instanceof Coord) {
            return new Coord(this.col - c.col, this.row - c.row);
        }
        return new Coord(this.col - c, this.row - c);
    }

    /**
     * Tests if the values of this coord equal the values of a given coord.
     * @param {Coord} c The coord to compare
     * @returns {boolean}
     */
    equals (c) {
        return this.col === c.col && this.row === c.row;
    }

    /**
     * Initializes/sets this coord to the given values.
     * @param {number} col
     * @param {number} row
     * @returns {Coord}
     */
    init (col, row) {
        this.col = col;
        this.row = row;
        return this;
    }

    /**
     * Rounds the values of this coord and returns a new one.
     * @returns {Coord}
     */
    round () {
        const q = Math.round(this.col);
        const r = Math.round(this.row);
        return new Coord(q, r);
    }

    /**
     * Transforms this coord to a cell.
     * @param {number} offset An optional odd/even offset that defaults to -1
     * @returns {Cell}
     */
    toCell (offset = -1) {
        const q = this.col;
        // eslint-disable-next-line  no-bitwise
        const r = this.row - Math.trunc((q + offset * (q & 1)) / 2);
        const s = -q - r;
        // eslint-disable-next-line  no-use-before-define
        return new Cell(q, r, s);
    }

    /**
     * Transforms this coord to a string.
     * @returns {string}
     */
    toString () {
        return `${this.col}:${this.row}`;
    }

    /**
     * Transforms this coord to an array.
     * @returns {number[]}
     */
    toArray () {
        return [this.col, this.row];
    }
}
