import { SAVED_STATE_KEY } from '../constants';

/**
 * Retrieves a saved state from localStorage by a given key.
 * @param {string} [key] A localStorage item key
 * @returns {Object} The saved state.
 */
const getSavedState = (key = SAVED_STATE_KEY) => (
    localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : undefined
);

export default getSavedState;
