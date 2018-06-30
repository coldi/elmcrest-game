import getEffectsState from './getEffectsState';

/**
 * Selects a effect by a given id.
 * @param {Object} state The global state
 * @param {string} id A effect id
 * @returns {Object} A effect object
 */
const getEffectById = (state, id) => getEffectsState(state).byId[id];

export default getEffectById;
