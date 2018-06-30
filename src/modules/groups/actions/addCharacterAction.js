/**
 * Adds a given characterId to the group's characterIds.
 * @param {string} groupId A group id
 * @param {string} characterId A character id
 * @returns {Object} A redux action
 */
const addCharacterAction = (
    groupId,
    characterId,
) => ({
    type: `${addCharacterAction}`,
    payload: { groupId, characterId },
});

addCharacterAction.toString = () => 'groups/add character';

export default addCharacterAction;
