import { combineReducers } from 'redux';
import general from './general';
import windows from './windows';

export default combineReducers({
    general,
    windows,
});
