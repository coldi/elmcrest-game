import memoize from '../../utils/memoize';
import { getCell } from '../../hex';
import getGroupsSettings from './getGroupsSettings';
import getGroupById from './getGroupById';

/**
 * Returns a list of coords that are within the view range of a group.
 * They are not necessarily visible.
 * @param {Object} state The global state
 * @param {string} id A group id
 * @param {number} [range] An optional range
 * @returns {Array[]} A list of coords
 */
const getGroupsRangeCoords = memoize(
    (state, id) => getGroupById(state, id),
    (state, id, range) => {
        const { sightRange } = getGroupsSettings(state);
        const group = getGroupById(state, id);
        const cell = getCell(group.coord);
        const visibleCells = cell.rangeNeighbors(range || sightRange);

        return visibleCells.map(c => c.toArray2D());
    }
);

export default getGroupsRangeCoords;
