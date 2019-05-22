import isAddModifier from '../../effects/utils/isAddModifier';
import getItemTypeById from './getItemTypeById';
import getAffixById from './getAffixById';
import getItemsSettings from './getItemsSettings';

/**
 * Selects all combined effects of a (stack) item.
 * This means regular effects from the item type as well as
 * effects from affixes.
 * @param {Object} state The global state
 * @param {Object} item An item object
 * @returns {Array} A list of effects
 */
const getEffectsOfItem = (state, item) => {
    const { levelScaleFactor } = getItemsSettings(state);
    const { level = 1 } = item;
    const itemType = getItemTypeById(state, item.itemTypeId);
    const regularEffects = itemType.effects;
    let affixEffects;

    try {
        // reduce item affixes to flat list of effects
        affixEffects = [...item.prefixes, ...item.suffixes]
            .map(affixId => getAffixById(state, affixId))
            .reduce((list, affix) => list.concat(affix.effects), []);
    } catch (err) {
        affixEffects = [];
    }

    return (
        regularEffects
            .concat(affixEffects)
            // scale effects based on item level
            .map(effect => ({
                ...effect,
                value: [effect.value]
                    .map(val => Number(val) * level * levelScaleFactor)
                    .map(val => {
                        if (isAddModifier(effect)) {
                            return val > 0 ? Math.ceil(val) : Math.floor(val);
                        }

                        return val;
                    })[0],
            }))
            // summarize effects by name so they only occur once on an item,
            // e.g.: [str +1, str +3] -> [str +4]
            .reduce((list, effect) => {
                const existing = list.find(({ name }) => name === effect.name);
                if (existing) {
                    const value = existing.value + effect.value;
                    const result = { ...existing, value };
                    return [...list.filter(({ name }) => name !== effect.name), result];
                }
                return [...list, effect];
            }, [])
            // sort by value desc
            .sort((a, b) => a.value < b.value)
    );
};

export default getEffectsOfItem;
