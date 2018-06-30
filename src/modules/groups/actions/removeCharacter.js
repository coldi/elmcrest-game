import updateCharacterAction from '../../characters/actions/updateCharacterAction';
import getGroupById from '../selectors/getGroupById';
import removeCharacterAction from './removeCharacterAction';

/**
 * Removes a character from a group.
 * @param {string} groupId A group id
 * @param {string} characterId A character id
 * @returns {Function} A redux thunk
 */
const removeCharacter = (
    groupId,
    characterId,
) => (dispatch, getState) => {
    const state = getState();
    const group = getGroupById(state, groupId);

    const isMember = group.characterIds.indexOf(characterId) > -1;

    if (isMember) {
        dispatch(removeCharacterAction(groupId, characterId));
        dispatch(updateCharacterAction(characterId, { groupId: null }));
    }
};

export default removeCharacter;
