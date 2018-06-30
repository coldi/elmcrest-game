import getWindowsState from './getWindowsState';

/**
 * Gets a window from the windows state by a given id.
 * @param {Object} state The global state
 * @param {string} id A window id
 * @returns {Object} A window object
 */
const getWindowById = (state, id) => getWindowsState(state)[id];

export default getWindowById;
