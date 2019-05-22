import getStacksList from './getStacksList';

/**
 * Selects the first found stack for a given item object.
 * If no stack was found it returns undefined.
 * @param {Object} state The global state
 * @param {string} id An inventory id
 * @param {string} item An item object
 * @returns {Object} An item stack
 */
const getStackOfItem = (state, id, item) =>
    getStacksList(state, id).find(
        stack =>
            stack.item.itemTypeId === item.itemTypeId &&
            (!item.level || stack.item.level === item.level) &&
            (!item.qualityId || stack.item.qualityId === item.qualityId)
    );

export default getStackOfItem;
