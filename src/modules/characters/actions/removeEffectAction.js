/**
 * Removes a status effect to a character.
 * @param {string} id A character id
 * @param {Object} props The effect props
 * @returns {Object} A redux action
 */
const removeEffectAction = (id, props) => ({
    type: `${removeEffectAction}`,
    payload: { id, props }
});

removeEffectAction.toString = () => 'characters/remove effect';

export default removeEffectAction;
