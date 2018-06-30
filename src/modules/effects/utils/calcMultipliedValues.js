import Immutable from 'seamless-immutable';

/**
 * Calculates the final attribute values from base * multipliers.
 * @param {Object} baseValues An attribute object w/ increased values
 * @param {Object} multipliers An object with multipliers
 * @param {string[]} [path] An object path if multipliers contains nested structures.
 * @returns {Object} An attribute object with final values
 */
const calcMultipliedValues = (baseValues, multipliers = {}, path = []) => {
    const currentObj = Immutable.getIn(multipliers, path) || multipliers;

    return Object.keys(currentObj).reduce((props, key) => {
        const currentPath = [...path, key];
        const multiplier = Immutable.getIn(multipliers, currentPath);

        if (typeof multiplier === 'object') {
            return calcMultipliedValues(baseValues, multipliers, currentPath);
        }

        return Immutable.updateIn(
            props,
            currentPath,
            (value) => value * (1 + multiplier)
        );
    }, baseValues);
};

export default calcMultipliedValues;
