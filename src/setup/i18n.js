import addLocalePathAction from '../modules/i18n/actions/addLocalePathAction';
import initLocales from '../modules/i18n/actions/initLocales';

/**
 * Adds base locales to i18n locale paths.
 */
export default async function i18n(dispatch) {
    dispatch(addLocalePathAction('locales'));
    await dispatch(initLocales());
}
