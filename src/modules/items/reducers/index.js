import { combineReducers } from 'redux';
import affixes from './affixes';
import itemTypes from './itemTypes';
import qualities from './qualities';
import settings from './settings';

export default combineReducers({
    affixes,
    itemTypes,
    qualities,
    settings,
});
