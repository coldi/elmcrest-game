import getCachedFieldByCoord from '../../world/selectors/getCachedFieldByCoord';
import getGroupById from '../../groups/selectors/getGroupById';
import { STATIC_INVENTORY, DYNAMIC_INVENTORY } from '../constants';
import getInventoryById from './getInventoryById';

/**
 * Gets the owner of an inventory (e.g. Group or Field).
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @returns {Object} An owner object
 */
const getInventoryOwner = (state, id) => {
    const { ownerId, type } = getInventoryById(state, id);

    if (ownerId !== null) {
        if (type === STATIC_INVENTORY) {
            const coord = ownerId.split('_');
            return getCachedFieldByCoord(state, coord);
        }
        if (type === DYNAMIC_INVENTORY) {
            return getGroupById(state, ownerId);
        }
    }

    return null;
};

export default getInventoryOwner;
