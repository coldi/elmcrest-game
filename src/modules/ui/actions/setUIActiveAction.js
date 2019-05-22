/**
 * An action creator that sets the current active state of the UI.
 * @param {boolean} active The active state
 * @returns {Object} A redux action
 */
const setUIActiveAction = active => ({
    type: `${setUIActiveAction}`,
    payload: { active },
});

setUIActiveAction.toString = () => 'ui/set ui active';

export default setUIActiveAction;
