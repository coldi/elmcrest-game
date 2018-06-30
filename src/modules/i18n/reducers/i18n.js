import { DEFAULT_LANG } from '../constants';
import setLangAction from '../actions/setLangAction';
import addLocalePathAction from '../actions/addLocalePathAction';

const initialState = {
    lang: DEFAULT_LANG,
    localePaths: [],
};

/**
 * The i18n state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function i18n (
    state = initialState,
    action = {}
) {
    switch (action.type) {

        case `${setLangAction}`: {
            const { lang } = action.payload;
            return { ...state, lang };
        }

        case `${addLocalePathAction}`: {
            const { path } = action.payload;

            if (!state.localePaths.includes(path)) {
                return {
                    ...state,
                    localePaths: [
                        ...state.localePaths,
                        path,
                    ],
                };
            }

            return state;
        }

        default: {
            return state;
        }

    }
}
