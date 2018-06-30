/**
 * An action creator that gets dispatched when a battle ends.
 * @param {Object} result A battle result object
 * @returns {Object} A redux action
 */
const endBattleAction = (result) => ({
    type: `${endBattleAction}`,
    payload: { result },
    meta: { onlyObserve: true },
});

endBattleAction.toString = () => 'combat/end battle';

export default endBattleAction;
