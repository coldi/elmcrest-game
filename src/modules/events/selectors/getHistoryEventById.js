import getHistoryEvents from './getHistoryEvents';

/**
 * Selects the latest history event for a given id.
 * @param {Object} state The global state
 * @param {string} eventId An event id
 * @returns {Object} The events state
 */
const getHistoryEventById = (state, eventId) => (
    getHistoryEvents(state).find(
        event => event.id === eventId
    )
);

export default getHistoryEventById;
