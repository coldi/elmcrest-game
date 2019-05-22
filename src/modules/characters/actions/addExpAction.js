/**
 * Adds experience to a given character.
 * @param {string} id A character id
 * @param {number} exp
 * @returns {Object} A redux action
 */
const addExpAction = (id, exp = 0) => ({
    type: `${addExpAction}`,
    payload: { id, exp },
});

addExpAction.toString = () => 'characters/add exp';

export default addExpAction;
