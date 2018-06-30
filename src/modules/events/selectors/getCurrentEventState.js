import getCurrentEvent from './getCurrentEvent';

/**
 * Selects the state of the current event.
 * @param {Object} state The global state
 * @returns {Object} The events state
 */
const getCurrentEventState = (state) => (
    getCurrentEvent(state).state
);

export default getCurrentEventState;
