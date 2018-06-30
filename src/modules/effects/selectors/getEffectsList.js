import getEffectsState from './getEffectsState';

/**
 * Selects a list of all registered effects.
 * @param {Object} state The global state
 * @returns {Array} A list of effects
 */
const getEffectsList = (state) => (
    Object.values(getEffectsState(state).byId)
);

export default getEffectsList;
