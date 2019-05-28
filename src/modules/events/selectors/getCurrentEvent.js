import getEventsState from './getEventsState';

/**
 * Selects the current event.
 * @param {Object} state The global state
 * @returns {Object} The events state
 */
const getCurrentEvent = state => getEventsState(state).currentEvent;

export default getCurrentEvent;
