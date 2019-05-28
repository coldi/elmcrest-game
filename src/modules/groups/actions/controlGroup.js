import getGroupById from '../selectors/getGroupById';
import proceedWithActionQueue from './proceedWithActionQueue';
import performTask from './performTask';

/**
 * Controls a group.
 * @param {string} groupId A group id
 * @returns {Function}
 */
const controlGroup = groupId => (dispatch, getState) => {
    const group = getGroupById(getState(), groupId);

    if (group.actionQueue.length) {
        dispatch(proceedWithActionQueue(groupId));
    } else {
        // fake some random movement
        const [x, y] = group.coord;
        const coord = [
            x + Math.round(Math.random() * 20 - 10),
            y + Math.round(Math.random() * 20 - 10),
        ];
        dispatch(performTask(groupId, coord));
    }
};

export default controlGroup;
