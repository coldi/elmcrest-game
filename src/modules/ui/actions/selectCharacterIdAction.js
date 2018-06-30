/**
 * An action creator that sets the currently selected character id.
 * @param {string} id A character id
 * @returns {Object} A redux action
 */
const selectCharacterIdAction = (
    id
) => ({
    type: `${selectCharacterIdAction}`,
    payload: { id },
});

selectCharacterIdAction.toString = () => 'ui/select character id';

export default selectCharacterIdAction;
