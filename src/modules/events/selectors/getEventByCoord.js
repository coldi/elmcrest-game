import getKeyFromCoord from '../../world/utils/getKeyFromCoord';
import getEventsState from './getEventsState';

/**
 * Selects a event by a given coord.
 * @param {Object} state The global state
 * @param {number[]} coord A coord
 * @returns {Object} A event object
 */
const getEventByCoord = (state, coord) => {
    const key = getKeyFromCoord(coord);

    return getEventsState(state).byCoord[key] || null;
};

export default getEventByCoord;
