import invariant from '../../utils/invariant';
import getItemTypeById from '../../items/selectors/getItemTypeById';
import getCharacterById from '../../characters/selectors/getCharacterById';
import updateCharacterAction from '../../characters/actions/updateCharacterAction';
import getStackById from '../selectors/getStackById';
import updateStackAction from './updateStackAction';
import unequipStack from './unequipStack';

/**
 * Equips a stack item to a character.
 * @param {string} invId An inventory id
 * @param {string} stackId An item stack id
 * @param {string} charId A character id
 * @returns {Function} A redux thunk
 */
const equipStack = (
    invId,
    stackId,
    charId,
) => (dispatch, getState) => {
    const state = getState();
    const stack = getStackById(state, invId, stackId);
    const itemType = getItemTypeById(state, stack.item.itemTypeId);
    const { equip } = getCharacterById(state, charId);

    invariant(itemType.slot, `Cannot equip item '${itemType.id}' that has no slot defined.`);
    invariant(equip[itemType.slot] !== undefined, `The slot for item '${itemType.id}' does not exist: ${itemType.slot}`);

    if (equip[itemType.slot] !== null) {
        dispatch(unequipStack(invId, equip[itemType.slot].stackId, charId));
    }

    dispatch(updateCharacterAction(charId, {
        equip: {
            ...equip,
            [itemType.slot]: { stackId },
        },
    }));
    dispatch(updateStackAction(invId, stackId, {
        equipped: true,
    }));

    return getStackById(getState(), invId, stackId);
};

export default equipStack;
