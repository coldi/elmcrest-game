import uid from '../../utils/uid';
import invariant from '../../utils/invariant';
import { STATIC_INVENTORY, DYNAMIC_INVENTORY } from '../constants';
import { inventoryDefaults } from '../definitions';
import createInventoryAction from './createInventoryAction';

/**
 * Creates an inventory.
 * @param {Object} [props] Specific inventory props
 * @returns {Function} A redux thunk
 */
const createInventory = (props = {}) => dispatch => {
    const inventory = {
        ...inventoryDefaults,
        ...props,
    };

    if (!inventory.id) {
        inventory.id = uid('inv');
    }

    invariant(
        [STATIC_INVENTORY, DYNAMIC_INVENTORY].indexOf(inventory.type) > -1,
        'Cannot create inventory without proper inventory type.'
    );

    dispatch(createInventoryAction(inventory));

    return inventory;
};

export default createInventory;
