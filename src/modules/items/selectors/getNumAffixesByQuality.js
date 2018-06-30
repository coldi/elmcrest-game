import pickWeighted from '../../utils/pickWeighted';
import getItemsState from './getItemsState';

/**
 * Returns an object with the computed amount of prefixes and suffixes for
 * the given quality key.
 * @param {Object} state The global state
 * @param {string} qualityId The desired quality
 * @returns {{ prefix: number, suffix: number }}
 */
const getNumAffixesByQuality = (state, qualityId) => {
    const { qualities } = getItemsState(state);
    const { numAffixes, affixWeights } = qualities[qualityId];
    const possibleSlots = Object.entries(affixWeights).map(([tag, weight]) => ({ tag, weight }));
    const picked = pickWeighted(possibleSlots, 'weight');
    const result = {
        prefix: picked && picked.tag.includes('prefix')
            ? Math.ceil(Math.random() * (numAffixes / 2))
            : 0,
        suffix: picked && picked.tag.includes('suffix')
            ? Math.ceil(Math.random() * (numAffixes / 2))
            : 0,
    };

    return result;
};

export default getNumAffixesByQuality;
