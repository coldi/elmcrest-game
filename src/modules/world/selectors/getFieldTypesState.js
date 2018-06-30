import getWorldState from './getWorldState';

/**
 * Selects the field types state.
 * @param {Object} state The global state
 * @returns {Object} The scene state
 */
const getResourcesState = (state) => getWorldState(state).fieldTypes;

export default getResourcesState;
