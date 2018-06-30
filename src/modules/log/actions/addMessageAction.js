/**
 * An action creator that adds a log message to the log state.
 * @param {Object} message A log message object
 * @returns {Object} A redux action
 */
const addMessageAction = (
    message
) => ({
    type: `${addMessageAction}`,
    payload: { message },
});

addMessageAction.toString = () => 'log/add message';

export default addMessageAction;
