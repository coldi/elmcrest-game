import getItemsState from './getItemsState';
import getItemsSettings from './getItemsSettings';

/**
 * Returns the weighted quality key for a given set of item types.
 * @param {Object} state The global state
 * @param {Object} itemsByQuality A list of item types grouped by quality
 * @param {number} bonus Drop chance bonus
 * @returns {string}
 */
const getComputedQualityKey = (state, itemsByQuality, bonus) => {
    const { qualities } = getItemsState(state);
    const { qualityChanceConstant, qualityEnvironmentDivisor } = getItemsSettings(state);
    // get quality ids sorted by rating
    const availableQualities = Object.keys(itemsByQuality).sort(
        (a, b) => qualities[a].rating < qualities[b].rating
    );
    const iLvl = 1; // to be resolved...
    const qLvl = 1; // to be resolved...
    const magicFind = 0; // to be resolved...
    const chanceConstant = qualityChanceConstant;
    const environmentDivisor = qualityEnvironmentDivisor;
    const environmentFactor = bonus || 0;
    for (const key of availableQualities) {
        const quality = qualities[key];
        const chance = (quality.rating - ((iLvl - qLvl) / quality.divisor)) * chanceConstant;
        const effectiveChance = (chance * 100) / (100 + magicFind);
        if (effectiveChance < quality.min) {
            return key;
        }

        // eslint-disable-next-line  max-len
        const finalChance = effectiveChance - ((effectiveChance * environmentFactor) / environmentDivisor);
        if (Math.random() * finalChance < chanceConstant) {
            return key;
        }
    }

    return availableQualities.pop();
};

export default getComputedQualityKey;
