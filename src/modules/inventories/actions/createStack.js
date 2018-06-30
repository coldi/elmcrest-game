import uid from '../../utils/uid';
import invariant from '../../utils/invariant';
import getItemTypeById from '../../items/selectors/getItemTypeById';
import { stackDefaults } from '../definitions';
import createStackAction from './createStackAction';

/**
 * Creates an item stack.
 * @param {string} invId An inventory id
 * @param {Object} stackProps The stack props
 * @returns {Function} A redux thunk
 */
const createStack = (
    invId,
    stackProps,
) => (dispatch, getState) => {
    invariant(stackProps.item, 'Stack requires an item property.');
    invariant(
        getItemTypeById(getState(), stackProps.item.itemTypeId),
        `Item type with id '${stackProps.item.itemTypeId}' does not exist.`
    );

    const stack = {
        ...stackDefaults,
        id: uid('stack'),
        order: 0,
        equipped: false,
        ...stackProps,
    };

    dispatch(createStackAction(invId, stack));

    return stack;
};

export default createStack;
