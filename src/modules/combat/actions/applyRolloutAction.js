/**
 * An action creator that gets dispatched when a rollout is applied.
 * @param {Object} rollout A rollout object
 * @returns {Object} A redux action
 */
const applyRolloutAction = rollout => ({
    type: `${applyRolloutAction}`,
    payload: { rollout },
    meta: { onlyObserve: true },
});

applyRolloutAction.toString = () => 'combat/apply rollout';

export default applyRolloutAction;
