/**
 * An action creator that adds an event for a specific world coord.
 * @param {Object} event An event object with a coord prop
 * @returns {Object} A redux action
 */
const createEventAtCoordAction = event => ({
    type: `${createEventAtCoordAction}`,
    payload: { event },
});

createEventAtCoordAction.toString = () => 'events/create event at coord';

export default createEventAtCoordAction;
