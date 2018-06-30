/**
 * An action creator that updates an event at a specific world coord.
 * @param {Object} event An event object with a coord prop
 * @returns {Object} A redux action
 */
const updateEventAtCoordAction = (event) => ({
    type: `${updateEventAtCoordAction}`,
    payload: { event },
});

updateEventAtCoordAction.toString = () => 'events/update event at coord';

export default updateEventAtCoordAction;
