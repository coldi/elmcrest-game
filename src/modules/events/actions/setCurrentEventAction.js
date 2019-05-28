/**
 * An action creator that sets the currently active event.
 * @param {Object} event An event object
 * @returns {Object} A redux action
 */
const setCurrentEventAction = event => ({
    type: `${setCurrentEventAction}`,
    payload: { event },
});

setCurrentEventAction.toString = () => 'events/set current event';

export default setCurrentEventAction;
