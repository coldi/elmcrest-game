import memoize from '../../utils/memoize';
import getSceneState from '../../world/selectors/getSceneState';
import getEventByCoord from './getEventByCoord';
import getEventById from './getEventById';
import getEventsState from './getEventsState';

/**
 * Gets all events that are currently visible and
 * adds meta information for view rendering.
 * @param {Object} state The global state
 * @returns {Object[]} A list of events
 */
const getEventsInView = memoize(getEventsState, state => {
    const { coordsInView } = getSceneState(state);
    return coordsInView
        .reduce((list, coord) => {
            const event = getEventByCoord(state, coord);
            const isActive = event && event.active;
            return isActive ? list.concat([event]) : list;
        }, [])
        .map(instance => ({
            ...instance,
            meta: getEventById(state, instance.id),
        }));
});

export default getEventsInView;
