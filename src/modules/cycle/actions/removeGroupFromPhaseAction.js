/**
 * An action creator that removes a group from a specific phase.
 * @param {string} groupId The group id
 * @param {number} phaseIndex The phase index
 * @returns {Object} A redux action
 */
const removeGroupFromPhaseAction = (groupId, phaseIndex) => ({
    type: `${removeGroupFromPhaseAction}`,
    payload: { groupId, phaseIndex },
});

removeGroupFromPhaseAction.toString = () => 'cycle/remove group from phase';

export default removeGroupFromPhaseAction;
