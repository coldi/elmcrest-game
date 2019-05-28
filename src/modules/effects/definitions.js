/**
 * The status effect default properties.
 * @type {Object}
 */
export const effectDefaults = {
    id: null,
    // TBD ...
};

/**
 * The active status effect default properties.
 * Active effects are usually applied to a character.
 * @type {Object}
 */
export const activeEffectDefaults = {
    // eslint-disable-line
    name: null,
    value: 0,
    begin: null, // will be set to current turn
    duration: 0,
    context: null, // world or combat
    rel: null, // relation to group by
};
