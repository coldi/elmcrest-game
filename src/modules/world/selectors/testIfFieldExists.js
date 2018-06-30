import getFieldByCoord from './getFieldByCoord';

/**
 * Tests if a field entry for a given field or coord exists in the global state.
 * @param {Object} state The global state
 * @param {Object|number[]|string} fieldOrCoordOrKey A field object or coord or key
 * @returns {boolean}
 */
const testIfFieldExists = (state, fieldOrCoordOrKey) => {
    let coord;
    if (typeof fieldOrCoordOrKey === 'string') {
        coord = fieldOrCoordOrKey.split('_'); // key
    } else if (Array.isArray(fieldOrCoordOrKey)) {
        coord = fieldOrCoordOrKey; // coord
    } else {
        coord = fieldOrCoordOrKey.coord; // field
    }
    return getFieldByCoord(state, coord) !== null;
};

export default testIfFieldExists;
