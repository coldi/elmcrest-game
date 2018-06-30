/**
 * An action creator that adds a group to a specific phase.
 * @param {string} groupId The group id
 * @param {number} phaseIndex The phase index
 * @returns {Object} A redux action
 */
const addGroupToPhaseAction = (groupId, phaseIndex) => ({
    type: `${addGroupToPhaseAction}`,
    payload: { groupId, phaseIndex },
});

addGroupToPhaseAction.toString = () => 'cycle/add group to phase';

export default addGroupToPhaseAction;
