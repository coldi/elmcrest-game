/**
 * An action creator that removes the oldest rollout from the rollout stack.
 * @returns {Object} A redux action
 */
const removeRolloutAction = () => ({
    type: `${removeRolloutAction}`,
});

removeRolloutAction.toString = () => 'combat/remove rollout';

export default removeRolloutAction;
