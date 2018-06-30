import { getCell } from '../../hex';
import getGroupByCoord from './getGroupByCoord';
import getGroupsList from './getGroupsList';

/**
 * Gets all groups within a given radius from center coord.
 * @param {Object} state The global state
 * @param {number[]} originCoord A coord
 * @param {number} range The distance from origin
 * @returns {Object[]} A list of groups
 */
const getGroupsInRange = (state, originCoord, range) => {
    const origin = getCell(originCoord);

    return getGroupsList(state)
        .map(grp => grp.coord)
        .filter(coord => origin.distance(getCell(coord)) <= range)
        .map(coord => getGroupByCoord(state, coord));
};

export default getGroupsInRange;
