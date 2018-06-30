/**
 * Moves a group to a given coord.
 * @param {string} id A group id
 * @param {number[]} coord The coord the group should move to (absolute)
 * @param {number} cost AP cost
 * @returns {Object} A redux action
 */
const moveGroupAction = (id, coord, cost) => ({
    type: `${moveGroupAction}`,
    payload: { id, coord, cost },
    meta: { isGroupCommand: true },
});

moveGroupAction.toString = () => 'groups/move group';

export default moveGroupAction;
