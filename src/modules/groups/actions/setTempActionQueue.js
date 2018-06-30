import getSceneState from '../../world/selectors/getSceneState';
import isCoordWalkable from '../../world/selectors/isCoordWalkable';
import getCachedFieldByCoord from '../../world/selectors/getCachedFieldByCoord';
import compareCoords from '../../world/utils/compareCoords';
import findPath from '../../pathfinder';
import getGroupById from '../selectors/getGroupById';
import getGroupByCoord from '../selectors/getGroupByCoord';
import getGroupsVisibleCoords from '../selectors/getGroupsVisibleCoords';
import isPlayerGroup from '../selectors/isPlayerGroup';
import moveGroupAction from '../actions/moveGroupAction';
import attackGroupAction from '../actions/attackGroupAction';
import setTempActionQueueAction from './setTempActionQueueAction';
import getFieldType from '../../world/selectors/getFieldType';

/**
 * Creates a temporary queue of group actions in order to interact with a given coord.
 * @param {string} id A group id
 * @param {number[]} [coord] The coord the group wants to interact with
 * @returns {Function} A redux thunk
 */
const setTempActionQueue = (
    id,
    coord,
) => async (dispatch, getState) => {
    const state = getState();
    const group = getGroupById(state, id);

    const destination = (coord === undefined)
        ? getSceneState(state).selectedCoord
        : coord;

    if (!destination) {
        // if no proper destination was found resolve with no actions
        return Promise.resolve([]);
    }

    const isOccupied = getGroupByCoord(state, destination);

    // check for player to apply special treatment
    if (isPlayerGroup(state, id)) {
        const visibleCoords = getGroupsVisibleCoords(state, id);
        const visibleDestination = visibleCoords.find(compareCoords(destination));
        // make sure player can only interact with visible coords
        if (!visibleDestination) {
            dispatch(setTempActionQueueAction(id, []));
            return Promise.resolve([]);
        }
    }

    // assume group wants to walk to the given coord ...
    if (!isCoordWalkable(state, destination, isOccupied)) {
        // resolve with no actions if coord is unreachable
        return Promise.resolve([]);
    }

    // calculate actual path
    const path = await findPath(state, {
        fromCoord: group.coord,
        toCoord: destination,
        onlyStatic: isOccupied,
    });

    const actions = path
        // remove first (current) coord from path
        .slice(1)
        // map each step to action
        .map((step, index) => {
            const isLastIndex = (index + 1 === path.length - 1);
            // test if the last step is still occupied
            if (isOccupied && isLastIndex) {
                // replace last movement action with group interaction (attack)
                return attackGroupAction(id, step, 0);
            }

            const field = getCachedFieldByCoord(state, step);
            const { travelCost } = getFieldType(state, field.climate, field.elevation);

            return moveGroupAction(id, step, travelCost);
        });

    dispatch(setTempActionQueueAction(id, actions));

    return Promise.resolve(actions);
};

export default setTempActionQueue;
