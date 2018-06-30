/**
 * An action creator that sets a flag in the UI to show the result of the last battle.
 * @param {boolean} active
 * @returns {Object} A redux action
 */
const showResultAction = (
    active = true
) => ({
    type: `${showResultAction}`,
    payload: { active },
});

showResultAction.toString = () => 'combat/show result';

export default showResultAction;
