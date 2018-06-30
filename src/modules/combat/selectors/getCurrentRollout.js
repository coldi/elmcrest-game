import getCombatUIState from './getCombatUIState';

/**
 * Selects the currently active rollout.
 * @param {Object} state The global state
 * @returns {Object}
 */
const getCurrentRollout = (state) => (
    getCombatUIState(state).rollouts[0]
);

export default getCurrentRollout;
