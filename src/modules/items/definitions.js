/**
 * The item type default properties.
 * @type {Object}
 */
export const itemTypeDefaults = {
    id: null,
    type: 'misc', // 'armor', 'weapon', 'misc'
    resourceId: '',
    size: 0,
    consumable: false,
    slot: '', // 'head', 'body', 'legs', ...
    effects: [],
    rarity: 1,
    // item quality related
    normal: true,
    uncommon: false,
    special: false,
    rare: false,
};

/**
 * The quality default properties.
 * @type {Object}
 */
export const qualityDefaults = {
    id: null,
    min: 0,
    rating: 0,
    divisor: 0,
    numAffixes: 0,
    affixWeights: {
        prefix: 0,
        suffix: 0,
        'prefix|suffix': 0,
    },
};

/**
 * The item default properties.
 * @type {Object}
 */
export const itemDefaults = {
    itemTypeId: null,
    qualityId: null,
    level: 1,
    prefixes: [],
    suffixes: [],
};

/**
 * The affix default properties.
 * @type {Object}
 */
export const affixDefaults = {
    id: null,
    prefix: false,
    suffix: false,
    normal: false,
    uncommon: true,
    special: true,
    rare: true,
    rarity: 1,
    itemTypes: ['armor', 'weapon'],
    effects: [],
};
