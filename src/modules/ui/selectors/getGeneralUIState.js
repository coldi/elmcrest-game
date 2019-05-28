import getUIState from './getUIState';

/**
 * Selects the general UI state.
 * @param {Object} state The global state
 * @returns {Object} The general state
 */
const getGeneralUIState = state => getUIState(state).general;

export default getGeneralUIState;
