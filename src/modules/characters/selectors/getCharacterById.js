import memoize from '../../utils/memoize';
import applyModifiers from '../../effects/utils/applyModifiers';
import getBaseCharacterById from './getBaseCharacterById';
import getCharacterEffectsById from './getCharacterEffectsById';
import getComputedCharacterById from './getComputedCharacterById';

/**
 * Returns a character with applied effect modifiers.
 * @param {Object} state The global state
 * @param {string} id A character id
 * @returns {Object} A modified character object
 */
const getCharacterById = memoize(
    getBaseCharacterById,
    (state, id) => {
        const computedCharacter = getComputedCharacterById(state, id);
        const effects = getCharacterEffectsById(state, id);

        if (effects.length !== 0) {
            return applyModifiers(effects, computedCharacter);
        }

        return computedCharacter;
    },
);

export default getCharacterById;
