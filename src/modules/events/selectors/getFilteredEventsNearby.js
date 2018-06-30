import { getCell } from '../../hex/index';
import getEventByCoord from './getEventByCoord';
import getEventsSettings from './getEventsSettings';

/**
 * Filters events based on nearby occurences of the same id,
 * so that an event id is only placed once within a specific radius.
 * @param {Object} state
 * @param {Array} events
 * @param {number[]} coord
 * @returns {Array}
 */
const getFilteredEventsNearby = (state, events, coord) => {
    const { uniqueWithinDistance } = getEventsSettings(state);

    const nearbyEvents = getCell(coord)
        .rangeNeighbors(uniqueWithinDistance)
        .map(cell => getEventByCoord(state, cell.toArray2D()))
        .filter(event => event);

    return events.filter(
        event => !nearbyEvents.some(({ id }) => id === event.id)
    );
};

export default getFilteredEventsNearby;
