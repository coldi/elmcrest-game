/**
 * Creates a path of coords by a given hash and index cell.
 * @param {Object} cameFrom A hash of the traveled cells
 * @param {Cell} indexCell The index cell from where to reconstruct the path
 * @returns {*[]} A list of coords
 */
const reconstructPath = (cameFrom, indexCell) => {
    let current = indexCell;
    const totalPath = [current];

    while (cameFrom[current]) {
        current = cameFrom[current];
        totalPath.unshift(current);
    }

    return totalPath;
};

export default reconstructPath;
