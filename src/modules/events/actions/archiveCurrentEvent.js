import { getCurrentEvent } from '../';
import setCurrentEventAction from './setCurrentEventAction';
import addEventToHistoryAction from './addEventToHistoryAction';

/**
 * Archives the currently active event and moves it to the event history.
 * @return {Function} A redux thunk
 */
const archiveCurrentEvent = () => (dispatch, getState) => {
    const { state, ...event } = getCurrentEvent(getState());

    if (event.id) {
        dispatch(setCurrentEventAction(null));
        dispatch(addEventToHistoryAction(event));
    }
};

export default archiveCurrentEvent;
