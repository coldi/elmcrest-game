import applyAddModifiers from './applyAddModifiers';
import applyMultiplyModifiers from './applyMultiplyModifiers';
import calcMultipliedValues from './calcMultipliedValues';

/**
 * Applies all given effects of type modifier to props.
 * @param {Array} effects A list of effects of which only modifiers are used
 * @param {Object} [base] A base object
 * @returns {Object} A modified object
 */
const applyModifiers = (effects, base = {}) => {
    const additions = applyAddModifiers(effects, base);
    const multipliers = applyMultiplyModifiers(effects);

    return calcMultipliedValues(additions, multipliers);
};

export default applyModifiers;
