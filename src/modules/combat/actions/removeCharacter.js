import getCharacterById from '../../characters/selectors/getCharacterById';
import getCurrentBattle from '../selectors/getCurrentBattle';
import endBattle from './endBattle';
import setCurrentBattleAction from './setCurrentBattleAction';

/**
 * Removes a character from combat, most likely due to death.
 * If all characters of a group are dead the battle is over.
 * @param {string} charId A character id
 * @returns {Function} A redux thunk
 */
const removeCharacter = charId => (dispatch, getState) => {
    const char = getCharacterById(getState(), charId);
    const battleState = getCurrentBattle(getState());

    // remove character from battle
    const nextBattleState = {
        characters: battleState.characters.filter(entry => entry.characterId !== char.id),
    };

    // update battle state
    dispatch(setCurrentBattleAction(nextBattleState));

    // test if there are no more characters in this group
    if (!nextBattleState.characters.find(entry => entry.groupId === char.groupId)) {
        dispatch(endBattle());
    }
};

export default removeCharacter;
