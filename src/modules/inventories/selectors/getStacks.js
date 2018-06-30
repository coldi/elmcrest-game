import getInventoryById from './getInventoryById';

/**
 * Selects the stacks of a given inventory id.
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @returns {Object} The stacks hash
 */
const getStacks = (state, id) => (
    getInventoryById(state, id).stacks
);

export default getStacks;
