import reducers from './reducers/i18n';

export default reducers;

export { default as getI18nState } from './selectors/getI18nState';
export { default as getLang } from './selectors/getLang';

export { default as addLocalePathAction } from './actions/addLocalePathAction';
export { default as extendLocales } from './actions/extendLocales';
export { default as initLocales } from './actions/initLocales';
export { default as setLangAction } from './actions/setLangAction';

export { default as translate } from './translate';
