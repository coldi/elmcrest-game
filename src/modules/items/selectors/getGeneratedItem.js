import pickWeighted from '../../utils/pickWeighted';
import makeAffixGenerator from '../utils/makeAffixGenerator';
import { itemDefaults } from '../definitions';
import getItemTypesByConditions from './getItemTypesByConditions';
import getQualitiesOfItemTypes from './getQualitiesOfItemTypes';
import getComputedQualityKey from './getComputedQualityKey';
import getNumAffixesByQuality from './getNumAffixesByQuality';

/**
 * Returns a generated item that matches the given conditions.
 * Every condition that is not set will be generated randomly.
 * @param {Object} state The global state
 * @param {Object} conditions Some conditions
 * @returns {Object} The generated result
 */
const getGeneratedItem = (state, conditions) => {
    const { quality, bonus, level = 1, ...itemTypeConditions } = conditions;

    // find base item types that matches conditions
    const itemTypes = getItemTypesByConditions(state, itemTypeConditions);
    // get item types grouped by quality
    const itemTypesByQuality = getQualitiesOfItemTypes(state, itemTypes);
    // compute the resulting quality
    const qualityId = quality || getComputedQualityKey(state, itemTypesByQuality, bonus);
    // get item types that match quality
    const qualifiedItemTypes = itemTypesByQuality[qualityId];

    // cancel if no item types for desired quality exist
    if (!qualifiedItemTypes || !qualifiedItemTypes.length) return null;

    // pick the resulting item type
    const itemType = pickWeighted(qualifiedItemTypes, 'rarity');
    // get numbers of available affixes on the resulting item
    const numAffixes = getNumAffixesByQuality(state, qualityId);
    // make affix generator
    const generateAffixes = makeAffixGenerator(state, {
        type: itemType.type,
        quality: qualityId,
    });
    // generate affixes
    const prefixes = generateAffixes('prefix', numAffixes.prefix);
    const suffixes = generateAffixes('suffix', numAffixes.suffix);

    return {
        ...itemDefaults,
        itemTypeId: itemType.id,
        qualityId,
        level,
        prefixes,
        suffixes,
    };
};

export default getGeneratedItem;
