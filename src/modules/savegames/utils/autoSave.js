import debounce from 'lodash/debounce';
import { SAVED_STATE_KEY, AUTO_SAVE_DELAY } from '../constants';
import saveState from '../actions/saveState';

/**
 * Enables auto-save functionality via store subscription.
 * @param {Object} store The redux store
 * @param {string} [key] A localStorage item key
 * @param {number} [delay] A debounce delay
 */
const autoSave = (store, key = SAVED_STATE_KEY, delay = AUTO_SAVE_DELAY) => {
    store.subscribe(
        debounce(() => {
            requestIdleCallback(() => store.dispatch(saveState(key)));
        }, delay)
    );
};

export default autoSave;
