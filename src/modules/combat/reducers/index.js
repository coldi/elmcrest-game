import { combineReducers } from 'redux';
import settings from './settings';
import currentBattle from './currentBattle';
import history from './history';
import ui from './ui';

export default combineReducers({
    settings,
    currentBattle,
    history,
    ui,
});
