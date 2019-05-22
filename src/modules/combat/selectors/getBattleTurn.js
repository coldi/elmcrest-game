import getCurrentBattle from './getCurrentBattle';

/**
 * Selects the turn of the current battle.
 * @param {Object} state The global state
 * @returns {number} The current turn
 */
const getBattleTurn = state => getCurrentBattle(state).turn;

export default getBattleTurn;
