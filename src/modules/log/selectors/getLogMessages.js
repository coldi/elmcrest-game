import getLogState from './getLogState';

/**
 * Alias for getLogState(). Returns a list of all messages.
 * @param {Object} state The global state
 * @returns {Object} A list of log messages
 */
const getLogMessages = state => getLogState(state);

export default getLogMessages;
