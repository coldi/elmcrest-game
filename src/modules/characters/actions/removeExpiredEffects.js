import getCurrentTurn from '../../cycle/selectors/getCurrentTurn';
import getBattleTurn from '../../combat/selectors/getBattleTurn';
import isCharacterInBattle from '../../combat/selectors/isCharacterInBattle';
import { COMBAT_CONTEXT } from '../../effects/constants';
import getCharacterById from '../selectors/getCharacterById';
import removeEffectAction from '../actions/removeEffectAction';

/**
 * Removes all expired effects on a given character by id.
 * @param {string} charId A character id
 * @returns {Function} A redux thunk
 */
const removeExpiredEffects = (
    charId,
) => (dispatch, getState) => {
    const state = getState();
    const inBattle = isCharacterInBattle(state, charId);
    const turn = inBattle ? getBattleTurn(state) : getCurrentTurn(state);
    const character = getCharacterById(state, charId);
    const { id, effects = [] } = character;

    effects.forEach((effect) => {
        const duration = isNaN(effect.duration)
            ? Infinity
            : effect.duration;

        const hasExpired = turn > effect.begin + duration;
        const hasObsoleteContext = !inBattle && effect.context === COMBAT_CONTEXT;

        if (hasExpired || hasObsoleteContext) {
            dispatch(removeEffectAction(id, effect));
        }
    });
};

export default removeExpiredEffects;
