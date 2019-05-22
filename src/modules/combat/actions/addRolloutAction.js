/**
 * An action creator that adds an rollout to the rollouts stack.
 * @param {Object} rollout A rollout object
 * @returns {Object} A redux action
 */
const addRolloutAction = rollout => ({
    type: `${addRolloutAction}`,
    payload: { rollout },
});

addRolloutAction.toString = () => 'combat/add rollout';

export default addRolloutAction;
