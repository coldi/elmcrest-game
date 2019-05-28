import memoize from '../../utils/memoize';
import getGroupById from '../../groups/selectors/getGroupById';
import getStackById from '../../inventories/selectors/getStackById';
import getEffectsOfItem from '../../items/selectors/getEffectsOfItem';
import getBaseCharacterById from './getBaseCharacterById';

/**
 * Returns a list of active effects from equipped items.
 * @param {Object} state The global state
 * @param {string} id A character id
 * @returns {Array} A list of effects
 */
const getCharacterEffectsFromEquip = memoize(getBaseCharacterById, (state, id) => {
    const { equip, groupId } = getBaseCharacterById(state, id);
    const { inventoryId } = getGroupById(state, groupId);

    return Object.keys(equip).reduce((list, slot) => {
        const equipSlot = equip[slot];

        if (equipSlot !== null) {
            const stack = getStackById(state, inventoryId, equipSlot.stackId);
            const effects = getEffectsOfItem(state, stack.item);

            return list.concat(effects);
        }

        return list;
    }, []);
});

export default getCharacterEffectsFromEquip;
