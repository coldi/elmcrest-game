import getEventsState from './getEventsState';

/**
 * Selects a event by a given id.
 * @param {Object} state The global state
 * @param {string} id A event id
 * @returns {Object} A event object
 */
const getEventById = (state, id) => getEventsState(state).byId[id];

export default getEventById;
