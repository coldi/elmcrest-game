import reducers from './reducers';

export default reducers;

export { default as getUIState } from './selectors/getUIState';
export { default as getGeneralUIState } from './selectors/getGeneralUIState';
export { default as getWindowsState } from './selectors/getWindowsState';
export { default as getWindowById } from './selectors/getWindowById';
export { default as getActiveWindowId } from './selectors/getActiveWindowId';

export { default as selectCharacterIdAction } from './actions/selectCharacterIdAction';
export { default as setUIActiveAction } from './actions/setUIActiveAction';
export { default as setUIVisibleAction } from './actions/setUIVisibleAction';
export { default as setWindowActiveAction } from './actions/setWindowActiveAction';
export { default as toggleWindow } from './actions/toggleWindow';
export { default as updateWindowStateAction } from './actions/updateWindowStateAction';

export { DEVTOOL_WINDOW, CHARACTER_WINDOW, SKILLS_WINDOW } from './constants';
