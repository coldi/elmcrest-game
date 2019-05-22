/**
 * An action creator that sets the player controlled group in combat.
 * @param {string} groupId A group id
 * @returns {Object} A redux action
 */
const setControlledGroupIdAction = groupId => ({
    type: `${setControlledGroupIdAction}`,
    payload: { groupId },
});

setControlledGroupIdAction.toString = () => 'combat/set controlled group id';

export default setControlledGroupIdAction;
