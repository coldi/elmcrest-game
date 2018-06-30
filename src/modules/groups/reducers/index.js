import { combineReducers } from 'redux';
import settings from './settings';
import byId from './byId';

export default combineReducers({
    settings,
    byId,
});
