/**
 * An action creator that adds a path to a locale file.
 * @param {string} path A path to a locales folder within scripts/
 * @returns {Object} A redux action
 */
const addLocalePathAction = (
    path
) => ({
    type: `${addLocalePathAction}`,
    payload: { path },
});

addLocalePathAction.toString = () => 'i18n/add locale path';

export default addLocalePathAction;
