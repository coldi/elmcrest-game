/**
 * An action creator that sets the state of the current event.
 * @param {Object} eventState An event state
 * @returns {Object} A redux action
 */
const setCurrentEventStateAction = eventState => ({
    type: `${setCurrentEventStateAction}`,
    payload: { eventState },
});

setCurrentEventStateAction.toString = () => 'events/set current event state';

export default setCurrentEventStateAction;
