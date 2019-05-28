/* eslint-disable  import/prefer-default-export */

/**
 * A simple representation of a position in 2d space.
 */
export default class Point {
    /**
     * Constructor.
     * @param {number} x
     * @param {number} y
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Adds the values from a given point or number and returns a new point.
     * @param {Point|number} p The point or number to add
     * @returns {Point}
     */
    add(p) {
        if (p instanceof Point) {
            return new Point(this.x + p.x, this.y + p.y);
        }
        return new Point(this.x + p, this.y + p);
    }

    /**
     * Subtracts the values from a given point or number and returns a new point.
     * @param {Point|number} p The point or number to subtract
     * @returns {Point}
     */
    sub(p) {
        if (p instanceof Point) {
            return new Point(this.x - p.x, this.y - p.y);
        }
        return new Point(this.x - p, this.y - p);
    }

    /**
     * Tests if the values of this point equal the values of a given point.
     * @param {Point} p The point to compare
     * @returns {boolean}
     */
    equals(p) {
        return this.x === p.x && this.y === p.y;
    }

    /**
     * Initializes/sets this point to the given values.
     * @param {number} x
     * @param {number} y
     * @returns {Point}
     */
    init(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * Rounds the values of this point and returns a new one.
     * @returns {Point}
     */
    round() {
        const x = Math.round(this.x);
        const y = Math.round(this.y);
        return new Point(x, y);
    }

    /**
     * Calculates the square distance of this point and a given point.
     * @param {Point} p
     * @returns {number}
     */
    squareDistance(p) {
        const dx = this.x - p.x;
        const dy = this.y - p.y;
        return dx * dx + dy * dy;
    }

    /**
     * Calculates the distance of this point and a given point.
     * @param {Point} p
     * @returns {number}
     */
    distance(p) {
        return Math.sqrt(this.squareDistance(p));
    }

    /**
     * Clones this point.
     * @returns {Point}
     */
    clone() {
        return new Point(this.x, this.y);
    }

    /**
     * Transforms this point to a string.
     * @returns {string}
     */
    toString() {
        return `${this.x}, ${this.y}`;
    }

    /**
     * Transforms this point to an array.
     * @returns {number[]}
     */
    toArray() {
        return [this.x, this.y];
    }
}
