import getUIState from './getUIState';

/**
 * Selects the windows state.
 * @param {Object} state The global state
 * @returns {Object} The window state
 */
const getWindowsState = state => getUIState(state).windows;

export default getWindowsState;
