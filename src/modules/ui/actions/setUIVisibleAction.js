/**
 * An action creator that sets the visibility of the UI.
 * @param {boolean} visible
 * @returns {Object} A redux action
 */
const setUIVisibleAction = (
    visible
) => ({
    type: `${setUIVisibleAction}`,
    payload: { visible },
});

setUIVisibleAction.toString = () => 'ui/set ui visible';

export default setUIVisibleAction;
