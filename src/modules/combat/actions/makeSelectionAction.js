/**
 * An action creator that makes an UI selection.
 * @param {string} key The selection to update
 * @param {*} value A value
 * @returns {Object} A redux action
 */
const makeSelectionAction = (key, value) => ({
    type: `${makeSelectionAction}`,
    payload: { key, value },
});

makeSelectionAction.toString = () => 'combat/make selection';

export default makeSelectionAction;
