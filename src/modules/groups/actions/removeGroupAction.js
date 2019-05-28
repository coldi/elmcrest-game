/**
 * Removes a group.
 * @param {string} id A group id
 * @returns {Object} A redux action
 */
const removeGroupAction = id => ({
    type: `${removeGroupAction}`,
    payload: { id },
});

removeGroupAction.toString = () => 'groups/remove group';

export default removeGroupAction;
