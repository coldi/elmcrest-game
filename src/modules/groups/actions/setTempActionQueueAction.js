/**
 * Adds actions to the groups temporary action queue.
 * @param {string} id A group id
 * @param {Object[]} actions A list of redux actions
 * @returns {Object} A redux action
 */
const setTempActionQueueAction = (id, actions = []) => ({
    type: `${setTempActionQueueAction}`,
    payload: { id, actions },
});

setTempActionQueueAction.toString = () => 'groups/set temp action queue';

export default setTempActionQueueAction;
