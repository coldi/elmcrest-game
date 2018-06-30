/**
 * Tests if a given list contains a given cell.
 * @param {Cell[]} list
 * @param {Cell} cell
 * @returns {boolean}
 */
const includes = (list, cell) => (
    list.some((item) => cell.equals(item))
);

export default includes;
