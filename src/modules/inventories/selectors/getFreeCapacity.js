import getTotalCapacity from './getTotalCapacity';
import getHoldCapacity from './getHoldCapacity';

/**
 * Gets the remaining free capacity of a given inventory.
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @returns {number}
 */
const getFreeCapacity = (state, id) =>
    getTotalCapacity(state, id) - getHoldCapacity(state, id);

export default getFreeCapacity;
