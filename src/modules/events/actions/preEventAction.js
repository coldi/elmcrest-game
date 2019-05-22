/**
 * An action creator that gets dispatched before an event is started.
 * @param {Object} id A event id
 * @returns {Object} A redux action
 */
const preEventAction = id => ({
    type: `${preEventAction}`,
    payload: { id },
    meta: { onlyObserve: true },
});

preEventAction.toString = () => 'events/pre event';

export default preEventAction;
