import { getCell } from '../../hex';
import getPlayerGroup from '../../groups/selectors/getPlayerGroup';
import isCoordWalkable from '../../world/selectors/isCoordWalkable';
import createRandomGroup from './createRandomGroup';
import getGroupsInRange from '../../groups/selectors/getGroupsInRange';
import getCachedRng from '../../procedural/selectors/getCachedRng';
import getGamemasterSettings from '../selectors/getGamemasterSettings';

/**
 * Checks if there are nearby groups.
 * If not, one or more new random groups get spawned outside the player's view.
 * @returns {Function} A redux thunk
 */
const spawnGroups = () => (dispatch, getState) => {
    const state = getState();
    const player = getPlayerGroup(state);
    const { groupSpawnRadius, groupDetectRadius } = getGamemasterSettings(state);
    // get all groups in range, excluding player
    const groupsInRange = getGroupsInRange(state, player.coord, groupDetectRadius).filter(
        grp => grp.id !== player.id
    );

    if (!groupsInRange.length) {
        // get a ring of cells in a radius around the player
        const cells = getCell(player.coord).ringNeighbors(groupSpawnRadius);

        // extract coord from cells
        const rng = getCachedRng(state);
        const coord = rng.pick(cells).toArray2D();

        if (isCoordWalkable(state, coord)) {
            // increase group's level based on the distance from origin
            const distance = getCell(coord).distance(getCell([0, 0]));
            const level = Math.ceil(distance / 5);
            // spawn only 1 group for now
            dispatch(createRandomGroup({ coord, level }));
        }
    }
};

export default spawnGroups;
