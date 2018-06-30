/**
 * An action creator that increments the turn.
 * @returns {Object} A redux action
 */
const incrementTurnAction = () => ({
    type: `${incrementTurnAction}`,
});

incrementTurnAction.toString = () => 'cycle/increment turn';

export default incrementTurnAction;
