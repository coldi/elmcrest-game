import { fieldDefaults } from '../definitions';
import getKeyFromCoord from '../utils/getKeyFromCoord';
import getFieldByCoord from './getFieldByCoord';
import getGeneratedClimateByCoord from './getGeneratedClimateByCoord';
import getGeneratedElevationByCoord from './getGeneratedElevationByCoord';

/**
 * Gets a field for a given coord eiter from state or generator cache if it does not exist.
 * @param {Object} state The global state
 * @param {number[]} coord A coord
 * @returns {Object} A field object
 */
const getCachedFieldByCoord = (state, coord) => {
    if (!Array.isArray(coord)) return null;

    // look for persisted field in state
    const field = getFieldByCoord(state, coord);
    if (field !== null) return field;

    // generate field and store in temporary cache
    const key = getKeyFromCoord(coord);
    const { cache } = getCachedFieldByCoord;
    if (!cache.has(key)) {
        cache.set(key, {
            ...fieldDefaults,
            coord,
            climate: getGeneratedClimateByCoord(state, coord),
            elevation: getGeneratedElevationByCoord(state, coord),
        });
    }

    return cache.get(key);
};

getCachedFieldByCoord.cache = new Map();

export default getCachedFieldByCoord;
