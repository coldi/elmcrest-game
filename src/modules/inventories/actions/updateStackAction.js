/**
 * Updates an item stack in an inventory.
 * @param {string} id An inventory id
 * @param {string} stackId A stack id
 * @param {Object} props The stack props to update
 * @returns {Object} A redux action
 */
const updateStackAction = (
    id,
    stackId,
    props,
) => ({
    type: `${updateStackAction}`,
    payload: { id, stackId, props },
});

updateStackAction.toString = () => 'inventories/update stack';

export default updateStackAction;
