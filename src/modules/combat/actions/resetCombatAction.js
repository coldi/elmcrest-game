/**
 * An action creator that resets battle and ui combat states.
 * @returns {Object} A redux action
 */
const resetCombatAction = () => ({
    type: `${resetCombatAction}`,
});

resetCombatAction.toString = () => 'combat/reset combat';

export default resetCombatAction;
