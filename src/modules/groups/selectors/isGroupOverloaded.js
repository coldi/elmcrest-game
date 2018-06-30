import getFreeCapacity from '../../inventories/selectors/getFreeCapacity';
import getGroupById from './getGroupById';

/**
 * Tests if a given group's inventory is overloaded.
 * @param {Object} state The global state
 * @param {string} id A group id
 * @returns {boolean}
 */
const isGroupOverloaded = (state, id) => {
    const { inventoryId } = getGroupById(state, id);

    return inventoryId
        ? getFreeCapacity(state, inventoryId) < 0
        : false;
};

export default isGroupOverloaded;
