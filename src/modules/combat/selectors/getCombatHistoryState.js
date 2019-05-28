import getCombatState from './getCombatState';

/**
 * Selects the combat history state.
 * @param {Object} state The global state
 * @returns {Object} The combat history state
 */
const getCombatHistoryState = state => getCombatState(state).history;

export default getCombatHistoryState;
