import { combineReducers } from 'redux';
import currentEvent from './currentEvent';
import history from './history';
import byId from './byId';
import byCoord from './byCoord';
import settings from './settings';

export default combineReducers({
    currentEvent,
    history,
    byId,
    byCoord,
    settings,
});
