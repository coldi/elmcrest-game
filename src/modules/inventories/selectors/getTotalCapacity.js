import getGroupCharacters from '../../groups/selectors/getGroupCharacters';
import { DYNAMIC_INVENTORY } from '../constants';
import getInventoriesSettings from './getInventoriesSettings';
import getInventoryById from './getInventoryById';
import getInventoryOwner from './getInventoryOwner';

/**
 * Gets the total capacity of a given inventory.
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @returns {number}
 */
const getTotalCapacity = (state, id) => {
    const { dynamicCapacity, staticCapacity } = getInventoriesSettings(state);
    const { type } = getInventoryById(state, id);
    const owner = getInventoryOwner(state, id);

    if (owner !== undefined) {
        if (type === DYNAMIC_INVENTORY) {
            const capacityPerCharacter = dynamicCapacity;
            const numCharacters = getGroupCharacters(state, owner.id).length;
            return capacityPerCharacter * numCharacters;
        }
    }

    return staticCapacity;
};

export default getTotalCapacity;
