import getCurrentBattle from './getCurrentBattle';

/**
 * Tests if a battle is currently running.
 * @param {Object} state The global state
 * @returns {boolean}
 */
const isBattleActive = (state) => (
    getCurrentBattle(state).active
);

export default isBattleActive;
