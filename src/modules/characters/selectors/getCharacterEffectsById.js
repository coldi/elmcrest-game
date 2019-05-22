import memoize from '../../utils/memoize';
import getBaseCharacterById from './getBaseCharacterById';
import getCharacterEffectsFromEquip from './getCharacterEffectsFromEquip';

/**
 * Returns a list of all active character effects.
 * @param {Object} state The global state
 * @param {string} id A character id
 * @returns {Array} A list of effects
 */
const getCharacterEffectsById = memoize(getBaseCharacterById, (state, id) => {
    const character = getBaseCharacterById(state, id);
    const { effects = [], groupId } = character;

    if (groupId === null) {
        // don't consider effects from equipped items if not in a group
        return effects;
    }

    // get active effects from equipped items
    const equipEffects = getCharacterEffectsFromEquip(state, id);

    return effects.concat(equipEffects);
});

export default getCharacterEffectsById;
