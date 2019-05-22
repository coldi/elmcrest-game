import makeAttributeModifier from './makeAttributeModifier';

/**
 * Applies a modifier effect to an object.
 * @param {Object} props The object to modify
 * @param {Object} effect The modifier effect object to apply
 * @returns {Object} Modified props
 */
const reduceModifier = (props, { name, value }) =>
    makeAttributeModifier(name.slice(1))(props, value);

export default reduceModifier;
