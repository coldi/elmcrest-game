/**
 * Removes a given characterId from the group's characterIds.
 * @param {string} groupId A group id
 * @param {string} characterId A character id
 * @returns {Object} A redux action
 */
const removeCharacterAction = (
    groupId,
    characterId,
) => ({
    type: `${removeCharacterAction}`,
    payload: { groupId, characterId },
});

removeCharacterAction.toString = () => 'groups/remove character';

export default removeCharacterAction;
