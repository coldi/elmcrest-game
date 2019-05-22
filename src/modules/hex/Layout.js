import Point from './Point';
import Cell from './Cell';

/* eslint-disable  no-mixed-operators */
/* eslint-disable  import/prefer-default-export */

/**
 * Orientation configuration for pointy layouts.
 */
export const POINTY = {
    f0: Math.sqrt(3.0),
    f1: Math.sqrt(3.0) / 2.0,
    f2: 0.0,
    f3: 3.0 / 2.0,
    b0: Math.sqrt(3.0) / 3.0,
    b1: -1.0 / 3.0,
    b2: 0.0,
    b3: 2.0 / 3.0,
    startAngle: 0.5,
};

/**
 * Orientation configuration for flat layouts.
 */
export const FLAT = {
    f0: 3.0 / 2.0,
    f1: 0.0,
    f2: Math.sqrt(3.0) / 2.0,
    f3: Math.sqrt(3.0),
    b0: 2.0 / 3.0,
    b1: 0.0,
    b2: -1.0 / 3.0,
    b3: Math.sqrt(3.0) / 3.0,
    startAngle: 0.0,
};

/**
 * An abstract hexagonal grid layout class.
 * Offers pixel <-> hex translation methods.
 * See http://www.redblobgames.com/grids/hexagons/#pixel-to-hex
 */
export default class Layout {
    /**
     * Constructor.
     * @param {number} size The size of a hexagon (opposing corners)
     * @param {Object} orientation The hexagon orientation (pointy or flat)
     * @param {Point} origin The origin of the layout
     */
    constructor(size = 1, orientation = FLAT, origin = new Point(0, 0)) {
        this.size = size;
        this.segment = new Point(size / 2, size / 2);
        this.orientation = orientation;
        this.origin = origin;
    }

    /**
     * Translates a given cell into 2d space coordinates.
     * @param {Cell} c The cell to translate
     * @returns {Point}
     */
    cellToPixel(c) {
        const M = this.orientation;
        const { segment } = this;
        const { origin } = this;
        const x = (M.f0 * c.x + M.f1 * c.y) * segment.x;
        const y = (M.f2 * c.x + M.f3 * c.y) * segment.y;
        return new Point(x + origin.x, y + origin.y);
    }

    /**
     * Translates a given point from 2d space into a cell position.
     * @param {Point} p The point to translate
     * @returns {Cell}
     */
    pixelToCell(p) {
        const M = this.orientation;
        const { segment } = this;
        const { origin } = this;
        const pt = new Point((p.x - origin.x) / segment.x, (p.y - origin.y) / segment.y);
        const q = M.b0 * pt.x + M.b1 * pt.y;
        const r = M.b2 * pt.x + M.b3 * pt.y;
        return new Cell(q, r, -q - r);
    }

    /**
     * Calculates the 2d offset position of a hexagon corner.
     * @param {number} corner The index of the corner [0...5]
     * @param {number} offset An optional range offset
     * @returns {Point}
     */
    getCornerOffset(corner, offset = 0) {
        const M = this.orientation;
        const { segment } = this;
        const angle = (2.0 * Math.PI * (corner + M.startAngle)) / 6;
        return new Point(
            (segment.x + offset) * Math.cos(angle),
            (segment.y + offset) * Math.sin(angle)
        );
    }

    /**
     * Gets a list of all 6 hexagon corners in 2d space.
     * @param {Cell} cell An optional cell to determine the corners of
     * @param {number} offset An optional range offset
     * @returns {Point[]}
     */
    getCellCorners(cell = null, offset = 0) {
        const corners = [];
        const origin = cell ? this.cellToPixel(cell) : new Point(0, 0);
        for (let i = 0; i < 6; i += 1) {
            const corner = this.getCornerOffset(i, offset);
            corners.push(new Point(origin.x + corner.x, origin.y + corner.y));
        }
        return corners;
    }
}
