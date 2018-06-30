import invariant from '../../utils/invariant';
import getItemTypeById from '../../items/selectors/getItemTypeById';
import getCharacterById from '../../characters/selectors/getCharacterById';
import updateCharacterAction from '../../characters/actions/updateCharacterAction';
import getStackById from '../selectors/getStackById';
import updateStackAction from './updateStackAction';

/**
 * Unequips a stack item from a character.
 * @param {string} invId An inventory id
 * @param {string} stackId An item stack id
 * @param {string} charId A character id
 * @returns {Function} A redux thunk
 */
const unequipStack = (
    invId,
    stackId,
    charId,
) => (dispatch, getState) => {
    const state = getState();
    const stack = getStackById(state, invId, stackId);
    const itemType = getItemTypeById(state, stack.item.itemTypeId);
    const { equip } = getCharacterById(state, charId);

    invariant(equip[itemType.slot] !== undefined, `The slot for item type '${itemType.id}' does not exist: ${itemType.slot}`);

    if (equip[itemType.slot] !== null) {
        dispatch(updateCharacterAction(charId, {
            equip: {
                ...equip,
                [itemType.slot]: null,
            },
        }));
        dispatch(updateStackAction(invId, stackId, {
            equipped: false,
        }));
    }
};

export default unequipStack;
