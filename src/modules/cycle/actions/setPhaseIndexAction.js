/**
 * An action creator that sets the phase index.
 * @param {number} phaseIndex The phase index
 * @returns {Object} A redux action
 */
const setPhaseIndexAction = phaseIndex => ({
    type: `${setPhaseIndexAction}`,
    payload: { phaseIndex },
});

setPhaseIndexAction.toString = () => 'cycle/set phase index';

export default setPhaseIndexAction;
