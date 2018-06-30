/**
 * An action creator that adds a battle result to the combat history.
 * @param {Object} result A battle result object
 * @returns {Object} A redux action
 */
const addBattleToHistoryAction = (
    result
) => ({
    type: `${addBattleToHistoryAction}`,
    payload: { result },
});

addBattleToHistoryAction.toString = () => 'combat/add battle to history';

export default addBattleToHistoryAction;
