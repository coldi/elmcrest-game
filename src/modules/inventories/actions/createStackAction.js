/**
 * Creates an item stack.
 * @param {string} id An inventory id
 * @param {Object} stack An item stack
 * @returns {Object} A redux action
 */
const createStackAction = (
    id,
    stack,
) => ({
    type: `${createStackAction}`,
    payload: { id, stack },
});

createStackAction.toString = () => 'inventories/create stack';

export default createStackAction;
