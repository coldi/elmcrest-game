/**
 * Removes a given stack from an inventory.
 * @param {string} id An inventory id
 * @param {string} stackId A stack id
 * @returns {Object} A redux action
 */
const removeStackAction = (id, stackId) => ({
    type: `${removeStackAction}`,
    payload: { id, stackId },
});

removeStackAction.toString = () => 'inventories/remove stack';

export default removeStackAction;
