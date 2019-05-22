import getScriptApi from '../../app/selectors/getScriptApi';
import { getCurrentEvent, getCurrentEventState, getEventByCoord } from '../';
import endCurrentEvent from './endCurrentEvent';
import setCurrentEventSceneAction from './setCurrentEventSceneAction';
import setCurrentEventStateAction from './setCurrentEventStateAction';

/**
 * Returns an object of commonly used event API methods.
 * Does not dispatch any actions directly.
 * @return {Function} A redux thunk
 */
const initEventApi = () => (dispatch, getState) => {
    const currentEvent = getCurrentEvent(getState());
    // set event API methods
    const endEvent = active => dispatch(endCurrentEvent(active));
    const gotoScene = sceneId => dispatch(setCurrentEventSceneAction(sceneId));
    const setEventState = eventState => dispatch(setCurrentEventStateAction(eventState));
    const getEventState = () => getCurrentEventState(getState());
    const instance = currentEvent.coord
        ? getEventByCoord(getState(), currentEvent.coord)
        : null;

    const scriptApi = getScriptApi(getState());

    return {
        ...scriptApi,
        getState,
        dispatch,
        endEvent,
        gotoScene,
        setEventState,
        getEventState,
        instance,
    };
};

export default initEventApi;
