import Immutable from 'seamless-immutable';

/**
 * Makes an modifier effect function for a given attribute.
 * @param {string} attribute An attribute path/name
 * @returns {Function} A modifier effect function
 */
const makeAttributeModifier = (attribute) => (props = {}, amount = 0) => (
    Immutable.updateIn(
        props,
        attribute.split('.'),
        (attr = 0) => attr + amount
    )
);

export default makeAttributeModifier;
