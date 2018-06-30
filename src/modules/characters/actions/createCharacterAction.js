/**
 * Creates a character.
 * @param {Object} character The character props
 * @returns {Object} A redux action
 */
const createCharacterAction = (character) => ({
    type: `${createCharacterAction}`,
    payload: { character }
});

createCharacterAction.toString = () => 'characters/create character';

export default createCharacterAction;
