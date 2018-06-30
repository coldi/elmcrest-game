import getItemTypeById from '../../items/selectors/getItemTypeById';
import getEffectsOfItem from '../../items/selectors/getEffectsOfItem';
import { itemDefaults } from '../../items/definitions';

/**
 * Populates a stack object with additional information
 * like item type and combined effects.
 * @param {Object} state The global state
 * @param {Object} stack An item stack object
 * @returns {Object} A populated stack object
 */
const getPopulatedStack = (state, stack) => ({
    ...stack,
    item: {
        ...itemDefaults,
        ...stack.item,
        itemType: getItemTypeById(state, stack.item.itemTypeId),
        effects: getEffectsOfItem(state, stack.item),
        // quality: getQualityById(state, stack.item.qualityId),
    },
});

export default getPopulatedStack;
