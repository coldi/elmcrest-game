import memoize from '../../utils/memoize';
import getGroupsState from './getGroupsState';
import getGroupById from './getGroupById';
import getPlayerGroup from './getPlayerGroup';
import getGroupLeader from './getGroupLeader';
import getGroupsVisibleCoords from './getGroupsVisibleCoords';
import getGroupByCoord from './getGroupByCoord';

/**
 * Gets all groups that are in sight of a given group.
 * Only groups that contain characters are considered and
 * information about the groups leader are attached for view rendering.
 * @param {Object} state The global state
 * @param {string} [id] A group id (defaults to player group id)
 * @returns {Object[]} A list of groups
 */
const getGroupsInView = memoize(getGroupsState, (state, id) => {
    const group = id === undefined ? getPlayerGroup(state) : getGroupById(state, id);

    return (
        getGroupsVisibleCoords(state, group.id)
            .map(coord => getGroupByCoord(state, coord))
            // take only groups that contain characters
            .filter(grp => grp && grp.characterIds.length)
            // add leader information
            .map(grp => ({
                ...grp,
                leader: getGroupLeader(state, grp.id),
            }))
    );
});

export default getGroupsInView;
