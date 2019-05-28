import getEventsState from './getEventsState';

/**
 * Selects the events settings.
 * @param {Object} state The global state
 * @returns {Object}
 */
const getEventsSettings = state => getEventsState(state).settings;

export default getEventsSettings;
