import getKeyFromCoord from '../../world/utils/getKeyFromCoord';
import { eventInstanceDefaults } from '../definitions';
import getEventByCoord from './getEventByCoord';
import getGeneratedEventIdByCoord from './getGeneratedEventIdByCoord';

/**
 * Gets an event for a given coord either from state or generator cache if it does not exist.
 * @param {Object} state The global state
 * @param {number[]} coord A coord
 * @returns {Object} An event object
 */
const getCachedEventByCoord = (state, coord) => {
    if (!Array.isArray(coord)) return null;

    // look for persisted event in state
    const stateEvent = getEventByCoord(state, coord);
    if (stateEvent !== null) return stateEvent;

    // generate event and store in temporary cache
    const key = getKeyFromCoord(coord);
    const { cache } = getCachedEventByCoord;
    if (!cache.has(key)) {
        const id = getGeneratedEventIdByCoord(state, coord);
        const event = id ? {
            ...eventInstanceDefaults,
            id,
            coord,
        } : null;

        cache.set(key, event);
    }

    return cache.get(key);
};

getCachedEventByCoord.cache = new Map();

export default getCachedEventByCoord;
