import isModifier from './isModifier';

/**
 * Tests if the given effect does a multiply modification.
 * @param {Object} effect
 * @returns {boolean}
 */
const isMultiplyModifier = effect => isModifier(effect) && effect.name.charAt(0) === '*';

export default isMultiplyModifier;
