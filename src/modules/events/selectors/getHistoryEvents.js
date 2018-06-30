import getEventsState from './getEventsState';

/**
 * Selects the history events.
 * @param {Object} state The global state
 * @returns {Object} The events state
 */
const getHistoryEvents = (state) => (
    getEventsState(state).history
);

export default getHistoryEvents;
