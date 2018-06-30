import getCharacterById from './getCharacterById';

/**
 * Returns the base damage a character inflicts on a target.
 * @param {Object} state The global state
 * @param {string} originCharId A character id
 * @param {string} targetCharId A target character id
 * @returns {number}
 */
const getBaseDamage = (state, originCharId, targetCharId) => {
    const origin = getCharacterById(state, originCharId);
    const target = getCharacterById(state, targetCharId);

    // TODO: implement better damage calculation
    // TODO: retrieve magic numbers from state (characters.settings?)

    // calc origin's damage multiplier
    const damageMultiplier = Math.min(
        origin.computed.meleeDamage / 25,
        2,
    );

    if (target) {
        // calc target's armor rating
        const armorRating = Math.min(
            target.computed.armor / 1000,
            0.5
        );
        // sum target's defense rating and armor rating
        const defenseMultiplier = Math.min(
            target.computed.defenseRating + armorRating,
            0.75,
        );

        return Math.max(
            0.1,
            damageMultiplier - defenseMultiplier
        );
    }

    return damageMultiplier;
};

export default getBaseDamage;
