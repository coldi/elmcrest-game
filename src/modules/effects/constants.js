/**
 * The RegEx to detect a modifier effect by effect name.
 * Tests if the string starts with + or * (for operation) and continues with a path (for attribute).
 * E.g. `+base.str` is considered an 'add' modifier for the base strength attribute.
 * @type {RegExp}
 */
export const MODIFIER_REGEX = /^(\*|\+)[a-z.]*$/i;

/**
 * The RegEx to detect a mutator effect by effect name.
 * Tests if the string starts with +=, -=, *= or /= (for operation)
 * and continues with a path (for attribute).
 * Another possibility is that the mutator refers to a script file.
 * In that case the name is testet for valid file name chars (a-z, .).
 * @type {RegExp}
 */
export const MUTATOR_REGEX = /^(\+=|-=|\*=|\/=)[a-z.]*$|^[a-z.]*$/i;

/**
 * The RegEx to detect a mutator effect script by effect name.
 * In that case the name is testet for valid file name chars (a-z, .).
 * @type {RegExp}
 */
export const MUTATOR_SCRIPT_REGEX = /^[a-z.]*$/i;

/**
 * The context type for effects that were applied in the world.
 * @type {string}
 */
export const WORLD_CONTEXT = 'world';

/**
 * The context type for effects that were applied during combat.
 * @type {string}
 */
export const COMBAT_CONTEXT = 'combat';
