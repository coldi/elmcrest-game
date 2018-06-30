/**
 * An action creator that gets dispatched when a battle starts.
 * @param {Object} result A battle result object
 * @returns {Object} A redux action
 */
const startBattleAction = () => ({
    type: `${startBattleAction}`,
    meta: { onlyObserve: true },
});

startBattleAction.toString = () => 'combat/start battle';

export default startBattleAction;
