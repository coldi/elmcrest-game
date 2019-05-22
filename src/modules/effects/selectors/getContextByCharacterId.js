import isCharacterInBattle from '../../combat/selectors/isCharacterInBattle';
import { WORLD_CONTEXT, COMBAT_CONTEXT } from '../constants';

/**
 * Returns the effect context for a given character id.
 * @param {Object} state The global state
 * @param {string} charId A character id
 * @returns {boolean}
 */
const getContextByCharacterId = (state, charId) =>
    isCharacterInBattle(state, charId) ? COMBAT_CONTEXT : WORLD_CONTEXT;

export default getContextByCharacterId;
