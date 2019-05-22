/**
 * Creates a group.
 * @param {Object} group The group props
 * @returns {Object} A redux action
 */
const createGroupAction = group => ({
    type: `${createGroupAction}`,
    payload: { group },
});

createGroupAction.toString = () => 'groups/create group';

export default createGroupAction;
