/**
 * An action creator that adds a performed action to the current event.
 * @param {string} actionId An action id
 * @returns {Object} A redux action
 */
const addActionToCurrentEventAction = actionId => ({
    type: `${addActionToCurrentEventAction}`,
    payload: { actionId },
});

addActionToCurrentEventAction.toString = () => 'events/add action to current event';

export default addActionToCurrentEventAction;
