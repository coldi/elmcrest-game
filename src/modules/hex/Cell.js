import Coord from './Coord';

/* eslint-disable  no-mixed-operators */
/* eslint-disable  import/prefer-default-export */

/**
 * A cell (cube) coordinate within a hexagonal grid.
 * See http://www.redblobgames.com/grids/hexagons/#coordinates
 */
export default class Cell {

    /**
     * Constructor.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(
        x = 0,
        y = 0,
        z = 0
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * A list of all available directions.
     * @type {Cell[]}
     */
    static DIRECTIONS = [
        new Cell(0, -1, 1),
        new Cell(1, -1, 0),
        new Cell(1, 0, -1),
        new Cell(0, 1, -1),
        new Cell(-1, 1, 0),
        new Cell(-1, 0, 1),
    ];

    /**
     * A list of all available diagonal directions.
     * @type {Cell[]}
     */
    static DIAGONALS = [
        new Cell(1, -2, 1),
        new Cell(2, -1, -1),
        new Cell(1, 1, -2),
        new Cell(-1, 2, -1),
        new Cell(-2, 1, 1),
        new Cell(-1, -1, 2),
    ];

    /**
     * Returns a directional cell by a given index.
     * @param {number} direction A direction index
     * @returns {Cell}
     */
    static direction (direction) {
        return Cell.DIRECTIONS[direction];
    }

    /**
     * Returns a new cell with negated values.
     * @returns {Cell}
     */
    negative () {
        return new Cell(-this.x, -this.y, -this.z);
    }

    /**
     * Adds the values from a given cell or number and returns a new cell.
     * @param {Cell|number} c The cell or number to add
     * @returns {Cell}
     */
    add (c) {
        if (c instanceof Cell) {
            return new Cell(this.x + c.x, this.y + c.y, this.z + c.z);
        }
        return new Cell(this.x + c, this.y + c, this.z + c);
    }

    /**
     * Subtracts the values from a given cell or number and returns a new cell.
     * @param {Cell|number} c The cell or number to subtract
     * @returns {Cell}
     */
    sub (c) {
        if (c instanceof Cell) {
            return new Cell(this.x - c.x, this.y - c.y, this.z - c.z);
        }
        return new Cell(this.x - c, this.y - c, this.z - c);
    }

    /**
     * Scales the values from a given cell or number and returns a new cell.
     * @param {Cell|number} c The cell or number to scale with
     * @returns {Cell}
     */
    scale (c) {
        if (c instanceof Cell) {
            return new Cell(this.x * c.x, this.y * c.y, this.z * c.z);
        }
        return new Cell(this.x * c, this.y * c, this.z * c);
    }

    /**
     * Divides the values from a given cell or number and returns a new cell.
     * @param {Cell|number} c The cell or number to divide with
     * @returns {Cell}
     */
    divide (c) {
        if (c instanceof Cell) {
            return new Cell(this.x / c.x, this.y / c.y, this.z / c.z);
        }
        return new Cell(this.x / c, this.y / c, this.z / c);
    }

    /**
     * Tests if the values of this cell equal the values of a given cell.
     * @param {Cell} c The cell to compare
     * @returns {boolean}
     */
    equals (c) {
        return this.x === c.x && this.y === c.y && this.z === c.z;
    }

    /**
     * Creates the dot product with a given cell.
     * @param {Cell} c
     * @returns {number}
     */
    dot (c) {
        return this.x * c.x + this.y * c.y + this.z * c.z;
    }

    /**
     * Performs cross operation with a given cell and returns a new one.
     * @param {Cell} c
     * @returns {Cell}
     */
    cross (c) {
        return new Cell(
            this.y * c.z - this.z * c.y,
            this.z * c.x - this.x * c.z,
            this.x * c.y - this.y * c.x
        );
    }

    /**
     * Calculates the length of this cell.
     * @returns {number}
     */
    length () {
        return Math.trunc((Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) / 2);
    }

    /**
     * Calculates the distance of this cell and a given cell.
     * @param {Cell} c
     * @returns {number}
     */
    distance (c) {
        return this.sub(c).length();
    }

    /**
     * Rounds the values of this cell and returns a new one.
     * @returns {Cell}
     */
    round () {
        let q = Math.trunc(Math.round(this.x));
        let r = Math.trunc(Math.round(this.y));
        let s = Math.trunc(Math.round(this.z));
        const qDiff = Math.abs(q - this.x);
        const rDiff = Math.abs(r - this.y);
        const sDiff = Math.abs(s - this.z);
        if (qDiff > rDiff && qDiff > sDiff) {
            q = -r - s;
        } else if (rDiff > sDiff) {
            r = -q - s;
        } else {
            s = -q - r;
        }
        return new Cell(q, r, s);
    }

    /**
     * Lerps this cell with a given cell and given amount and returns a new cell.
     * @param {Cell} c The direction in which to lerp
     * @param {number} t The amount
     * @returns {Cell}
     */
    lerp (c, t) {
        return new Cell(
            this.x + (c.x - this.x) * t,
            this.y + (c.y - this.y) * t,
            this.z + (c.z - this.z) * t
        );
    }

    /**
     * Returns the lowest value of this cell.
     * @returns {number}
     */
    min () {
        return Math.min(Math.min(this.x, this.y), this.z);
    }

    /**
     * Returns the highest value of this cell.
     * @returns {number}
     */
    max () {
        return Math.max(Math.max(this.x, this.y), this.z);
    }

    /**
     * Initializes/sets this cell to the given values.
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {Cell}
     */
    init (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /**
     * Gets the neighbor of this cell by given directional index.
     * @param {number} direction The index of the direction
     * @returns {Cell}
     */
    neighbor (direction) {
        return this.add(Cell.direction(direction));
    }

    /**
     * Gets the diagonal neighbor of this cell by given diagonal directional index.
     * @param {number} direction The index of the direction
     * @returns {Cell}
     */
    diagonalNeighbor (direction) {
        return this.add(Cell.DIAGONALS[direction]);
    }

    /**
     * Gets all neighbors of this cell within a given range.
     * @param {number} range
     * @returns {Cell[]}
     */
    rangeNeighbors (range) {
        const results = [];
        const R = range;
        let dz;
        for (let dy = -R; dy <= R; dy += 1) {
            for (let dx = Math.max(-R, -dy - R); dx <= Math.min(R, -dy + R); dx += 1) {
                dz = -dx - dy;
                results.push(this.add(new Cell(dx, dy, dz)));
            }
        }
        return results;
    }

    /**
     * Gets all neighbors of this cell within a given range in ring form.
     * @param {number} radius
     * @returns {Cell[]}
     */
    ringNeighbors (radius) {
        const results = [];
        let cell = this.add(Cell.direction(4).scale(radius));
        for (let i = 0; i < 6; i += 1) {
            for (let j = 0; j < radius; j += 1) {
                results.push(cell);
                cell = cell.neighbor(i);
            }
        }
        return results;
    }

    /**
     * Gets all cells on a line between this cell and a given cell.
     * @param {Cell} c
     * @returns {Cell[]}
     */
    lineTo (c) {
        const N = this.distance(c);
        const results = [];
        const step = 1.0 / Math.max(N, 1);
        for (let i = 0; i <= N; i += 1) {
            results.push(this.lerp(c, step * i).round());
        }
        return results;
    }

    /**
     * Clones this cell.
     * @returns {Cell}
     */
    clone () {
        return new Cell(this.x, this.y, this.z);
    }

    /**
     * Transforms this cell to a coord.
     * @param {number} offset An optional odd/even offset that defaults to -1
     * @returns {Coord}
     */
    toCoord (offset = -1) {
        const col = this.x;
        // eslint-disable-next-line  no-bitwise
        const row = this.y + Math.trunc((this.x + offset * (this.x & 1)) / 2);
        return new Coord(col, row);
    }

    /**
     * Transforms this cell to an array.
     * @returns {number[]}
     */
    toArray () {
        return [this.x, this.y, this.z];
    }

    /**
     * Transforms this cell to an 2D array.
     * @returns {number[]}
     */
    toArray2D () {
        return this.toCoord().toArray();
    }

    /**
     * Transforms this cell to a string.
     * @returns {string}
     */
    toString () {
        return `[${this.x}, ${this.y}, ${this.z}]`;
    }
}
