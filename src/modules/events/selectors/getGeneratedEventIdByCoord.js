import getCachedRng from '../../procedural/selectors/getCachedRng';
import makeNoiseGen from '../../procedural/utils/makeNoiseGen';
import log from '../../utils/log';
import getCachedFieldByCoord from '../../world/selectors/getCachedFieldByCoord';
import isCoordWalkable from '../../world/selectors/isCoordWalkable';
import getEventsList from './getEventsList';
import getEventsSettings from './getEventsSettings';
import getFilteredEventsByField from './getFilteredEventsByField';
import getFilteredEventsNearby from './getFilteredEventsNearby';

/**
 * Generates a event id by passing a given coord
 * to a seeded noise generator.
 * @param {Object} state
 * @param {number[]} coord
 * @return {string}
 */
const getGeneratedEventIdByCoord = (state, coord) => {
    const rng = getCachedRng(state);
    const settings = getEventsSettings(state);
    const generator = makeNoiseGen(state, 'event', {
        frequency: settings.noiseGenFrequency,
    });

    const n = generator.scaled(coord);

    // no event above certain chance
    if (n > settings.globalChance) return null;

    // no event if coord is not walkable
    if (!isCoordWalkable(state, coord)) return null;

    const field = getCachedFieldByCoord(state, coord);

    let events = getEventsList(state).filter(event => event.spawnConditions);
    events = getFilteredEventsNearby(state, events, coord);
    events = getFilteredEventsByField(state, events, field);

    if (!events.length) {
        log.warn('All events filtered - no events left to generate.');
        return null;
    }

    return rng.pick(events.map(event => event.id));
};

export default getGeneratedEventIdByCoord;
