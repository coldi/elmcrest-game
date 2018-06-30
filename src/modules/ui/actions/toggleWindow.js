import getWindowById from '../selectors/getWindowById';
import setWindowActiveAction from './setWindowActiveAction';

/**
 * A thunk that toggles the active state of a window by the given id.
 * @param {string} id The window id.
 * @param {boolean} [active] The optional active state.
 * @returns {Function} A redux thunk
 */
const toggleWindow = (
    id,
    active = null
) => (dispatch, getState) => {
    const window = getWindowById(getState(), id);
    const activeState = (active === null)
        ? (window && !window.active)
        : active;

    dispatch(setWindowActiveAction(id, activeState));
};

export default toggleWindow;
