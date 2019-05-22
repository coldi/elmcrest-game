import getEventScriptById from '../selectors/getEventScriptById';
import initEventApi from './initEventApi';

/**
 * Loads an event script by id and injects the event API.
 * @param {string} id An event id
 * @return {Function} A redux thunk
 */
const loadEventScript = id => async dispatch => {
    const script = await getEventScriptById(id);

    const eventApi = dispatch(initEventApi());

    return script(eventApi);
};

export default loadEventScript;
