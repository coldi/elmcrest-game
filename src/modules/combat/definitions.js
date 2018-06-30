/**
 * The group entry default properties.
 * @type {Object}
 */
export const groupEntryDefaults = {
    groupId: null,
};

/**
 * The character entry default properties.
 * @type {Object}
 */
export const characterEntryDefaults = {
    characterId: null,
    groupId: null,
    delay: 0,
    hasPerformed: false,
};

/**
 * The rollout default properties.
 * @type {Object}
 */
export const rolloutDefaults = {
    originId: null,
    targetId: null,
    skillId: null,
    stateId: null,
    result: null,
    skipDelayUpdate: false,
    delay: 0,
};

/**
 * The battle result default properties.
 * @type {Object}
 */
export const resultDefaults = {
    groupIds: [],
    characterIds: [],
    victory: null,
    winnerGroupId: null,
    loserGroupId: null,
    lootInventoryId: null,
    expGains: [],
};
