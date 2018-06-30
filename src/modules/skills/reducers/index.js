import { combineReducers } from 'redux';
import byId from './byId';
import skillTree from './skillTree';

export default combineReducers({
    byId,
    skillTree,
});
