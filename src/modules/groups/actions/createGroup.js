import uid from '../../utils/uid';
import log from '../../utils/log';
import { DYNAMIC_INVENTORY } from '../../inventories/constants';
import createInventory from '../../inventories/actions/createInventory';
import { groupDefaults } from '../definitions';
import createGroupAction from './createGroupAction';

/**
 * Creates a group.
 * @param {Object} [props] Specific group props
 * @returns {Function} A redux thunk
 */
const createGroup = (props = {}) => dispatch => {
    const group = {
        ...groupDefaults,
        ...props,
    };

    if (group.characterIds.length) {
        log.warn(
            'Found a prefilled list of character ids in createGroup() props.',
            'Please use addCharacter() instead.'
        );
    }

    if (!group.id) {
        group.id = uid('grp');
    }

    if (!group.inventoryId) {
        const inventory = dispatch(
            createInventory({ type: DYNAMIC_INVENTORY, ownerId: group.id })
        );
        group.inventoryId = inventory.id;
    }

    dispatch(createGroupAction(group));

    return group;
};

export default createGroup;
