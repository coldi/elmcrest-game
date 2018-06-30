/**
 * An action creator that sets the active state of a window.
 * @param {string} id The window id
 * @param {boolean} active The window active state
 * @returns {Object} A redux action
 */
const setWindowActiveAction = (
    id,
    active
) => ({
    type: `${setWindowActiveAction}`,
    payload: { id, active },
});

setWindowActiveAction.toString = () => 'ui/set window active';

export default setWindowActiveAction;
