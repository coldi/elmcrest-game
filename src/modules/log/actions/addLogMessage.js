import uid from '../../utils/uid';
import { messageDefaults } from '../definitions';
import addMessageAction from './addMessageAction';

/**
 * A thunk that prepares a log message and dispatches it to the store.
 * @param {string} text The message text
 * @param {Object} params The message params
 * @returns {Function} A redux thunk
 */
const addLogMessage = (
    text,
    params,
) => (dispatch) => {
    dispatch(addMessageAction({
        ...messageDefaults,
        id: uid('log'),
        text,
        params,
    }));
};

export default addLogMessage;
