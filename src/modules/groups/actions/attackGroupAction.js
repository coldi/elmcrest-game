/**
 * Attacks a group on a given coord.
 * @param {string} id A group id
 * @param {number[]} coord The coord the group should attack
 * @param {number} cost AP cost
 * @returns {Object} A redux action
 */
const attackGroupAction = (id, coord, cost) => ({
    type: `${attackGroupAction}`,
    payload: { id, coord, cost },
    meta: { isGroupCommand: true },
});

attackGroupAction.toString = () => 'groups/attack group';

export default attackGroupAction;
