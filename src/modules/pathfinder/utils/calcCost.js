import getCachedFieldByCoord from '../../world/selectors/getCachedFieldByCoord';
import getFieldType from '../../world/selectors/getFieldType';
import isCoordWalkable from '../../world/selectors/isCoordWalkable';

/**
 * Calculates the travel cost from one cell to another.
 * Returns -1 if the destination cannot be traveled.
 * @param {Object} state The global state
 * @param {Cell} fromCell The cell to start from
 * @param {Cell} toCell The cell to travel to
 * @param {boolean} onlyStatic A flag if only (static) fields should be considered
 * @returns {number} The travel cost
 */
const calcCost = (state, fromCell, toCell) => {
    const toCoord = toCell.toArray2D();
    const toField = getCachedFieldByCoord(state, toCoord);

    if (!isCoordWalkable(state, toCoord)) {
        return -1;
    }

    const { climate, elevation } = toField;
    const { travelCost = 0 } = getFieldType(state, climate, elevation);

    return travelCost;
};

export default calcCost;
