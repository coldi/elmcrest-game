/**
 * An action creator that sets battle information.
 * @param {Object} battle Battle information
 * @returns {Object} A redux action
 */
const setCurrentBattleAction = battle => ({
    type: `${setCurrentBattleAction}`,
    payload: { battle },
});

setCurrentBattleAction.toString = () => 'combat/set current battle';

export default setCurrentBattleAction;
