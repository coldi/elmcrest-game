import getStacks from './getStacks';

/**
 * Selects a stack by id from an inventory by id.
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @param {string} stackId A stack id
 * @returns {Object} An item stack
 */
const getStackById = (state, id, stackId) => (
    getStacks(state, id)[stackId]
);

export default getStackById;
