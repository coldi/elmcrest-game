/**
 * An action creator that removes a modal by id.
 * @param {string} id A modal id
 * @returns {Object} A redux action
 */
const removeModalAction = (
    id
) => ({
    type: `${removeModalAction}`,
    payload: { id },
});

removeModalAction.toString = () => 'modals/remove modal';

export default removeModalAction;
