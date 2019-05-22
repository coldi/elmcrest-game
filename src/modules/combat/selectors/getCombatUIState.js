import getCombatState from './getCombatState';

/**
 * Selects the combat UI state.
 * @param {Object} state The global state
 * @returns {Object} The combat UI state
 */
const getCombatUIState = state => getCombatState(state).ui;

export default getCombatUIState;
