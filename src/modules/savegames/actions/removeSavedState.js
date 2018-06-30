import { SAVED_STATE_KEY } from '../constants';

/**
 * Removes a saved state from localStorage by a given key.
 * @param {string} [key] A localStorage item key
 * @returns {Function} A redux thunk
 */
const removeSavedState = (
    key = SAVED_STATE_KEY
) => () => {
    localStorage.removeItem(key);
};

export default removeSavedState;
