import getAffixesList from './getAffixesList';

/**
 * Filters all available affixes from state by the given conditions.
 * @param {Object} state The global state
 * @param {Object} conditions
 * @returns {Array}
 */
const getAffixesByConditions = (state, conditions) =>
    getAffixesList(state)
        .filter(affix => affix.prefix === !!conditions.prefix)
        .filter(affix => affix.suffix === !!conditions.suffix)
        .filter(affix => affix[conditions.quality])
        .filter(affix => affix.itemTypes.includes(conditions.type))
        .filter(affix => !conditions.excludedIds.includes(affix.id));

export default getAffixesByConditions;
