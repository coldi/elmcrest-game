import { getCell } from '../../hex';
import getPlayerGroup from '../../groups/selectors/getPlayerGroup';
import getGroupsList from '../../groups/selectors/getGroupsList';
import getGroupByCoord from '../../groups/selectors/getGroupByCoord';
import removeGroup from '../../groups/actions/removeGroup';
import getGamemasterSettings from '../selectors/getGamemasterSettings';

/**
 * Despawns groups that are far away from the player.
 * @returns {Function} A redux thunk
 */
const despawnGroups = () => (dispatch, getState) => {
    const state = getState();
    const { groupDespawnRadius } = getGamemasterSettings(state);
    const player = getPlayerGroup(state);
    const origin = getCell(player.coord);

    getGroupsList(state)
        .map(grp => grp.coord)
        .filter(coord => origin.distance(getCell(coord)) > groupDespawnRadius)
        .map(coord => getGroupByCoord(state, coord))
        .forEach(grp => dispatch(removeGroup(grp.id, true, true)));
};

export default despawnGroups;
