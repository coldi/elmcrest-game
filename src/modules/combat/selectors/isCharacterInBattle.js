import isBattleActive from './isBattleActive';
import getQueuedEntries from './getQueuedEntries';

/**
 * Tests if a character participates in the current battle.
 * @param {Object} state The global state
 * @param {string} charId A character id
 * @returns {boolean}
 */
const isCharacterInBattle = (state, charId) =>
    isBattleActive(state) &&
    getQueuedEntries(state).some(entry => entry.characterId === charId);

export default isCharacterInBattle;
