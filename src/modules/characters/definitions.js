import { MALE_GENDER } from './constants';

/**
 * The character equip default properties.
 * @type {Object}
 */
export const equipDefaults = {
    head: null,
    body: null,
    feet: null,
    trinket: null,
    hand: null,
};

/**
 * The character default properties.
 * @type {Object}
 */
export const characterDefaults = {
    id: null,
    name: '',
    gender: MALE_GENDER,
    resourceId: null,
    groupId: null,
    effects: [],
    base: {
        str: 10,
        dex: 10,
        int: 10,
        cha: 10,
        per: 10,
        end: 10,
    },
    progress: {
        exp: 0,
        expMultiplier: 1,
        expBoost: 1,
        basePoints: 0,
        skillPoints: 0,
    },
    condition: {
        HPLost: 0,
        APUsed: 0,
        water: 1,
        food: 1,
        energy: 1,
    },
    computed: {
        level: null,
        HPMax: null,
        HP: null,
        APMax: null,
        AP: null,
        hitChance: null,
        armor: null,
        critChance: null,
        meleeDamage: null,
        rangeDamage: null,
        defenseRating: null,
    },
    skills: {
        attack: 1, // TODO: do not depend on setup-based content here
    },
    equip: { ...equipDefaults },
};
