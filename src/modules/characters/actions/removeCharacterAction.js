/**
 * Removes a character.
 * @param {string} id A character id
 * @returns {Object} A redux action
 */
const removeCharacterAction = (id) => ({
    type: `${removeCharacterAction}`,
    payload: { id }
});

removeCharacterAction.toString = () => 'characters/remove character';

export default removeCharacterAction;
