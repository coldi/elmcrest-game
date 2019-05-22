import clamp from 'lodash/clamp';
import memoize from '../../utils/memoize';
import applyModifiers from '../../effects/utils/applyModifiers';
import getBaseCharacterById from './getBaseCharacterById';
import getCharacterEffectsById from './getCharacterEffectsById';
import getLevelByExp from './getLevelByExp';

/**
 * Returns a character with computed stats.
 * The computed stats consider modified base attributes.
 * The modified base attributes are not returned in this version, though.
 * @param {Object} state The global state
 * @param {string} id A character id
 * @returns {Object} A modified character object
 */
const getComputedCharacterById = memoize(getBaseCharacterById, (state, id) => {
    const character = getBaseCharacterById(state, id);

    // calc attribute bonuses from current status effects
    const effects = getCharacterEffectsById(state, id);
    // filter all effects that contain a 'base' path in their name
    const baseEffects = effects.filter(({ name }) => name.includes('base.', 1));
    // filter all effects that contain a 'computed' path in their name
    const computedEffects = effects.filter(({ name }) => name.includes('computed.', 1));
    // get increased base values
    const { base, progress, condition } = applyModifiers(baseEffects, character);
    // get increased computed values;
    // these need to be considered when a computed value relies on another computed value,
    // e.g. HP needs to considers HPMax + bonus.HPMax
    const bonus = applyModifiers(computedEffects, character).computed;

    const { str, dex, int, per, end } = base;
    const { HPLost, APUsed } = condition;
    const { exp } = progress;

    const level = getLevelByExp(state, exp);

    const HPMax = Math.round(end * 50 + str * 10);
    const HP = HPMax + bonus.HPMax - HPLost;
    const APMax = Math.round((end / 2) * (1 - HPLost / HPMax));
    const AP = Math.max(0, APMax + bonus.APMax - APUsed);
    const meleeDamage = str * 1.5;
    const rangeDamage = (dex / 2 + per / 2) * 1.5;
    const armor = end * 5 + str * 2.5;

    const hitChance = clamp(Math.max(dex, int) / 20 + per / 20 / 2, 0, 1);
    const critChance = clamp(Math.max(dex, int) / 20 / 2, 0, 1);
    const defenseRating = clamp(Math.max(dex, int) / 20 / 4, 0, 1);

    return {
        ...character,
        computed: {
            level,
            HPMax,
            HP,
            APMax,
            AP,
            armor,
            defenseRating,
            hitChance,
            critChance,
            meleeDamage,
            rangeDamage,
        },
    };
});

export default getComputedCharacterById;
