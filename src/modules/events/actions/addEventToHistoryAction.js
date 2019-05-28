/**
 * An action creator that adds an event to the event history.
 * @param {Object} event An event object
 * @returns {Object} A redux action
 */
const addEventToHistoryAction = event => ({
    type: `${addEventToHistoryAction}`,
    payload: { event },
});

addEventToHistoryAction.toString = () => 'events/add event to history';

export default addEventToHistoryAction;
