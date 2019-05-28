/**
 * Adds multiple status effect to a character.
 * @param {string} id A character id
 * @param {Array} effects A list of effects
 * @returns {Object} A redux action
 */
const addEffectsAction = (id, effects) => ({
    type: `${addEffectsAction}`,
    payload: { id, effects },
});

addEffectsAction.toString = () => 'characters/add effects';

export default addEffectsAction;
