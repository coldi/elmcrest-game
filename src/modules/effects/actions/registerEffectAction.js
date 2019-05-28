/**
 * Registers an effect.
 * @param {Object} effect The effect props
 * @returns {Object} A redux action
 */
const registerEffectAction = effect => ({
    type: `${registerEffectAction}`,
    payload: { effect },
});

registerEffectAction.toString = () => 'effects/register effect';

export default registerEffectAction;
