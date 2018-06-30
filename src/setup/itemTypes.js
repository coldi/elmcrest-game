import { createItemTypesAction } from '../modules/items';
import { itemTypeDefaults } from '../modules/items/definitions';
import loadCSV from '../modules/utils/loadCSV';
import transformEffects from './utils/transformEffects';

/**
 * Creates item types.
 */
export default function items (dispatch, getState) {
    const state = getState();

    return loadCSV('item-types.csv')
        .then(result => result.data)
        .then(data => data.map(itemType => ({
            ...itemTypeDefaults,
            ...itemType,
            effects: transformEffects(state, itemType.effects),
        })))
        .then(createItemTypesAction)
        .then(dispatch);
}
