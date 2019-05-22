/**
 * Creates an inventory.
 * @param {Object} inventory An inventory object
 * @returns {Object} A redux action
 */
const createInventoryAction = inventory => ({
    type: `${createInventoryAction}`,
    payload: { inventory },
});

createInventoryAction.toString = () => 'inventories/create inventory';

export default createInventoryAction;
