import memoize from '../../utils/memoize';
import getWorldSettings from '../../world/selectors/getWorldSettings';
import getCachedFieldByCoord from '../../world/selectors/getCachedFieldByCoord';
import { getCell } from '../../hex';
import getGroupsSettings from './getGroupsSettings';
import getGroupById from './getGroupById';

/**
 * Returns a list of coords that are visible within the view range of a group.
 * @param {Object} state The global state
 * @param {string} id A group id
 * @param {number} [range] An optional range
 * @returns {Array[]} A list of coords
 */
const getGroupsVisibleCoords = memoize(
    (state, id) => getGroupById(state, id),
    (state, id, range) => {
        const { sightRange } = getGroupsSettings(state);
        const { elevationSightLimit } = getWorldSettings(state);
        const group = getGroupById(state, id);
        const origin = getCell(group.coord);
        const ring = origin.ringNeighbors(range || sightRange);
        const visibleCells = [origin];
        // loop over cells of outer ring
        for (const ringCell of ring) {
            // get cells on a direct line from origin to ring cell
            const line = origin.lineTo(ringCell).slice(1);
            // loop over line
            for (const cell of line) {
                const field = getCachedFieldByCoord(state, cell.toArray2D());
                visibleCells.push(cell);
                // break 'line of sight' if elevation is to high
                if (field.elevation >= elevationSightLimit) {
                    break;
                }
            }
        }

        return visibleCells.map(c => c.toArray2D());
    }
);

export default getGroupsVisibleCoords;
