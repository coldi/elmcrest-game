import getWindowsState from './getWindowsState';
import getWindowById from './getWindowById';

/**
 * Gets the currently active window id.
 * @param {Object} state The global state
 * @returns {string} A window id
 */
const getActiveWindowId = (state) => (
    Object.keys(getWindowsState(state)).find(
        (id) => getWindowById(state, id).active === true
    )
);

export default getActiveWindowId;
