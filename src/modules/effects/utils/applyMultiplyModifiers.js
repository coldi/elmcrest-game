import isMultiplyModifier from './isMultiplyModifier';
import reduceModifier from './reduceModifier';

/**
 * Calculates an object that contains a combined multiplier for each attribute value.
 * @param {Object} modifiers A list of modifier effects
 * @returns {Object} An object with multipliers
 */
const applyMultiplyModifiers = modifiers =>
    modifiers.filter(isMultiplyModifier).reduce(reduceModifier, {});

export default applyMultiplyModifiers;
