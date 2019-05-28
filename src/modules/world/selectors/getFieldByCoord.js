import getKeyFromCoord from '../utils/getKeyFromCoord';
import getMapState from './getMapState';

/**
 * Gets a field from the map state by a given coord.
 * @param {Object} state The map state
 * @param {number[]} coord A coord
 * @returns {Object} A field object
 */
const getFieldByCoord = (state, coord = []) => {
    const key = getKeyFromCoord(coord);
    const field = getMapState(state)[key];

    return field !== undefined ? field : null;
};

export default getFieldByCoord;
