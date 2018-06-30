/**
 * An action creator that sets the current language.
 * @param {string} lang A language code
 * @returns {Object} A redux action
 */
const setLangAction = (
    lang
) => ({
    type: `${setLangAction}`,
    payload: { lang },
});

setLangAction.toString = () => 'i18n/set lang';

export default setLangAction;
