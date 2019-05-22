import log from '../../utils/log';
import getItemTypeById from '../../items/selectors/getItemTypeById';
import applyEffects from '../../effects/actions/applyEffects';
import getEffectsOfItem from '../../items/selectors/getEffectsOfItem';

/**
 * Consumes an item by a character.
 * @param {string} charId A character id
 * @param {Object} item An item object
 * @returns {Function} A redux thunk
 */
const consumeItem = (charId, item) => (dispatch, getState) => {
    const itemType = getItemTypeById(getState(), item.itemTypeId);

    if (!itemType.consumable) {
        log.warn(`Item type '${itemType.id}' is not consumable.`);
        return false;
    }

    const effects = getEffectsOfItem(getState(), item);

    dispatch(applyEffects(charId, effects));

    return true;
};

export default consumeItem;
