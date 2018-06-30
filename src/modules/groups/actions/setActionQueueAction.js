/**
 * Adds one or more actions to the groups action queue.
 * @param {string} id A group id
 * @param {Object[]} actions A list of redux actions
 * @returns {Object} A redux action
 */
const addToActionQueueAction = (
    id,
    actions = [],
) => ({
    type: `${addToActionQueueAction}`,
    payload: { id, actions },
});

addToActionQueueAction.toString = () => 'groups/add to action queue';

export default addToActionQueueAction;
