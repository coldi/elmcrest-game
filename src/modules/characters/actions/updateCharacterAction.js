/**
 * Updates a character.
 * @param {Object} id A character id
 * @param {Object} props The character props to update
 * @returns {Object} A redux action
 */
const updateCharacterAction = (id, props) => ({
    type: `${updateCharacterAction}`,
    payload: { id, props },
});

updateCharacterAction.toString = () => 'characters/update character';

export default updateCharacterAction;
