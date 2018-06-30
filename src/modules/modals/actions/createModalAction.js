/**
 * An action creator that creates a modal.
 * @param {Object} modal A modal object
 * @returns {Object} A redux action
 */
const createModalAction = (
    modal
) => ({
    type: `${createModalAction}`,
    payload: { modal },
});

createModalAction.toString = () => 'modals/create modal';

export default createModalAction;
