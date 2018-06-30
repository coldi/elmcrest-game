/**
 * Removes an inventory.
 * @param {Object} id An inventory id
 * @returns {Object} A redux action
 */
const removeInventoryAction = (
    id,
) => ({
    type: `${removeInventoryAction}`,
    payload: { id },
});

removeInventoryAction.toString = () => 'inventories/remove inventory';

export default removeInventoryAction;
