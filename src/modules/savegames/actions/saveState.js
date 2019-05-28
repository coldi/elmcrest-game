import { SAVED_STATE_KEY } from '../constants';

/**
 * Saves the state of the game to localStorage by a given key.
 * @param {string} [key] A localStorage item key
 * @returns {Function} A redux thunk
 */
const saveState = (key = SAVED_STATE_KEY) => (dispatch, getState) => {
    // save game state
    localStorage.setItem(key, JSON.stringify(getState()));
};

export default saveState;
