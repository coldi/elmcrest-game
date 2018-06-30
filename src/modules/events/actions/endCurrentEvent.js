import promiseMap from '../../utils/promiseMap';
import getCurrentEvent from '../selectors/getCurrentEvent';
import archiveCurrentEvent from './archiveCurrentEvent';
import setCurrentEventAction from './setCurrentEventAction';
import updateEventAtCoordAction from './updateEventAtCoordAction';

/**
 * Ends the current event and resolves the mapped promise.
 * @param {boolean} [active=false] Whether the event instance should remain active
 * @returns {Function} A redux thunk
 */
const endCurrentEvent = (active = false) => (dispatch, getState) => {
    const { id, coord, state } = getCurrentEvent(getState());
    promiseMap.resolve(id);

    dispatch(archiveCurrentEvent());
    dispatch(setCurrentEventAction(null));

    if (coord) {
        dispatch(updateEventAtCoordAction({ coord, active, state }));
    }
};

export default endCurrentEvent;
