/**
 * An action creator that resets all UI selections.
 * @returns {Object} A redux action
 */
const resetSelectionAction = () => ({
    type: `${resetSelectionAction}`,
});

resetSelectionAction.toString = () => 'combat/reset selection';

export default resetSelectionAction;
