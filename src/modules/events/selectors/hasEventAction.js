import getHistoryEventById from './getHistoryEventById';

/**
 * Tests if an history event contains the given action id.
 * @param {Object} state The global state
 * @param {string} eventId An event id
 * @param {string} actionId An action id
 * @returns {boolean}
 */
const hasEventAction = (state, eventId, actionId) => {
    const event = getHistoryEventById(state, eventId);

    if (event !== undefined) {
        return event.actions.some(id => id === actionId);
    }

    return false;
};

export default hasEventAction;
