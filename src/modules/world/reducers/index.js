import { combineReducers } from 'redux';
import settings from './settings';
import fieldTypes from './fieldTypes';
import map from './map';
import scene from './scene';
import weather from './weather';

export default combineReducers({
    settings,
    fieldTypes,
    map,
    scene,
    weather,
});
