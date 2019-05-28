import getCycleState from './getCycleState';

/**
 * Selects the current turn.
 * @param {Object} state The global state
 * @returns {number} The current turn
 */
const getCurrentTurn = state => getCycleState(state).cycle.turn;

export default getCurrentTurn;
