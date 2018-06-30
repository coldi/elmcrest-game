import { SAVED_STATE_KEY } from '../constants';

/**
 * Tests if a saved state exists for a given key.
 * @param {string} [key] A localStorage item key
 * @returns {boolean}
 */
const hasSavedState = (key = SAVED_STATE_KEY) => (
    typeof localStorage.getItem(key) === 'string'
);

export default hasSavedState;
