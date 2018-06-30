import getGroupByCoord from '../../groups/selectors/getGroupByCoord';
import getCachedFieldByCoord from './getCachedFieldByCoord';
import getFieldType from './getFieldType';

/**
 * Tests if a given coord is walkable (e.g. by a character).
 * @param {Object} state The global state
 * @param {number[]} coord A coord
 * @param {boolean} [onlyStatic=false] A flag if only fields should be considered
 * @returns {boolean}
 */
const isCoordWalkable = (state, coord, onlyStatic = false) => {
    const field = getCachedFieldByCoord(state, coord);
    const fieldType = getFieldType(state, field.climate, field.elevation);
    return (
        fieldType.travelCost >= 0 &&
        (onlyStatic || getGroupByCoord(state, coord) === undefined)
    );
};

export default isCoordWalkable;
