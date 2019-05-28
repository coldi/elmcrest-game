import getEventsState from './getEventsState';

/**
 * Selects a list of all registered events.
 * @param {Object} state The global state
 * @returns {Array} A list of events
 */
const getEventsList = state => Object.values(getEventsState(state).byId);

export default getEventsList;
