import removeCharacterAction from '../../characters/actions/removeCharacterAction';
import removeInventoryAction from '../../inventories/actions/removeInventoryAction';
import getGroupById from '../selectors/getGroupById';
import removeGroupAction from './removeGroupAction';

/**
 * Removes a group by id and optionally all it's characters and inventory.
 * @param {string} id A group id
 * @param {boolean} [characters=false] A flag if characters should be removed
 * @param {boolean} [inventory=false] A flag if inventory should be removed
 * @returns {Function} A redux thunk
 */
const removeGroup = (
    id,
    characters = false,
    inventory = false
) => (dispatch, getState) => {
    const group = getGroupById(getState(), id);

    dispatch(removeGroupAction(id));

    if (characters) {
        group.characterIds.forEach(
            charId => dispatch(removeCharacterAction(charId))
        );
    }

    if (inventory) {
        dispatch(removeInventoryAction(group.inventoryId));
    }
};

export default removeGroup;
