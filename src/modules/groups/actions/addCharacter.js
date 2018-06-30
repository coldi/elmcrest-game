import log from '../../utils/log';
import updateCharacterAction from '../../characters/actions/updateCharacterAction';
import getGroupById from '../selectors/getGroupById';
import getGroupsSettings from '../selectors/getGroupsSettings';
import addCharacterAction from './addCharacterAction';

/**
 * Adds a character to a group after performing capacity validation.
 * @param {string} groupId A group id
 * @param {string} characterId A character id
 * @returns {Function} A redux thunk
 */
const addCharacter = (
    groupId,
    characterId,
) => (dispatch, getState) => {
    const state = getState();
    const group = getGroupById(state, groupId);
    const { maxCharactersInGroup } = getGroupsSettings(state);

    const hasCapacity = group.characterIds.length < maxCharactersInGroup;
    const isNoMember = group.characterIds.indexOf(characterId) === -1;

    if (hasCapacity && isNoMember) {
        dispatch(updateCharacterAction(characterId, { groupId }));
        dispatch(addCharacterAction(groupId, characterId));
    } else {
        log.warn(`Character with id '${characterId}' is unable to join group:`, group);
    }
};

export default addCharacter;
