import memoize from '../../utils/memoize';
import getGroupById from '../../groups/selectors/getGroupById';
import getStackById from '../../inventories/selectors/getStackById';
import getPopulatedStack from '../../inventories/selectors/getPopulatedStack';
import getBaseCharacterById from './getBaseCharacterById';

/**
 * Returns the currently equipped items of a character.
 * @param {Object} state The global state
 * @param {string} id A character id
 * @returns {Object} An equip-like object with items
 */
const getEquippedItemsOfCharacter = memoize(
    getBaseCharacterById,
    (state, id) => {
        const { equip, groupId } = getBaseCharacterById(state, id);
        const { inventoryId } = getGroupById(state, groupId);

        return Object.keys(equip).reduce((obj, slot) => {
            /* eslint-disable  no-param-reassign */
            const equipSlot = equip[slot];
            obj[slot] = equipSlot;

            if (equipSlot !== null) {
                const stack = getStackById(state, inventoryId, equipSlot.stackId);
                const populatedStack = getPopulatedStack(state, stack);

                obj[slot] = {
                    ...equipSlot, // stackId
                    ...populatedStack.item,
                };
            }

            return obj;
            /* eslint-enable  no-param-reassign */
        }, {});
    }
);

export default getEquippedItemsOfCharacter;
