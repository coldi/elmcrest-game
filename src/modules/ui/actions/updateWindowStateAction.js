/**
 * An action creator that updates the state of a given window by id.
 * @param {string} id The window id
 * @param {Object} stateUpdate The state to update
 * @returns {Object} A redux action
 */
const updateWindowStateAction = (id, stateUpdate) => ({
    type: `${updateWindowStateAction}`,
    payload: { id, stateUpdate },
});

updateWindowStateAction.toString = () => 'ui/update window state';

export default updateWindowStateAction;
