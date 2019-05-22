/**
 * Removes a action by index from the groups action queue.
 * The index defauls to 0 which removes the first action.
 * An index of null removes all actions.
 * @param {string} id A group id
 * @param {number} index A an optional index of the action to be removed (default: 0)
 * @returns {Object} A redux action
 */
const removeFromActionQueueAction = (id, index = 0) => ({
    type: `${removeFromActionQueueAction}`,
    payload: { id, index },
});

removeFromActionQueueAction.toString = () => 'groups/remove from action queue';

export default removeFromActionQueueAction;
