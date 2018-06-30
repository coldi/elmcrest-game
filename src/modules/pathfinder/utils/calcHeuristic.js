/**
 * Calculates the heuristic (e.g. distance) from one cell to another.
 * @param {Cell} fromCell The cell to start from
 * @param {Cell} toCell The cell to travel to
 * @returns {number} The heuristic distance value
 */
const calcHeuristic = (fromCell, toCell) => fromCell.distance(toCell);

export default calcHeuristic;
