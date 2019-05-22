import isAddModifier from './isAddModifier';
import reduceModifier from './reduceModifier';

/**
 * Calculates the attribute values with basic add operations.
 * @param {Object} modifiers A list of modifier effects
 * @param {Object} base An object with base values
 * @returns {Object} An attribute object with increased values
 */
const applyAddModifiers = (modifiers, base = {}) =>
    modifiers.filter(isAddModifier).reduce(reduceModifier, base);

export default applyAddModifiers;
