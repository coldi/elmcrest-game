/**
 * An action creator that sets the isDone state for a given group.
 * @param {string} id A group id
 * @param {boolean} isDone
 * @returns {Object} A redux action
 */
const setGroupDoneAction = (id, isDone) => ({
    type: `${setGroupDoneAction}`,
    payload: { id, isDone },
});

setGroupDoneAction.toString = () => 'groups/set group done';

export default setGroupDoneAction;
