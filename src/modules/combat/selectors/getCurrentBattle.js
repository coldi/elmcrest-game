import getCombatState from './getCombatState';

/**
 * Selects the current battle.
 * @param {Object} state The global state
 * @returns {Object} The current battle state
 */
const getCurrentBattle = (state) => (
    getCombatState(state).currentBattle
);

export default getCurrentBattle;
