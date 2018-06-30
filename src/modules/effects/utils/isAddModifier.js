import isModifier from './isModifier';

/**
 * Tests if the given effect does an add modification.
 * @param {Object} effect
 * @returns {boolean}
 */
const isAddModifier = (effect) => (
    isModifier(effect) && effect.name.charAt(0) === '+'
);

export default isAddModifier;
