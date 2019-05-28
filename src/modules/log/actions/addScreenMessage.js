import uid from '../../utils/uid';
import { SCREEN_MESSAGE_TYPE } from '../constants';
import { messageDefaults } from '../definitions';
import addMessageAction from './addMessageAction';

/**
 * A thunk that prepares a screen message and dispatches it to the store.
 * @param {string} text The message text
 * @param {Object} params The message params
 * @returns {Function} A redux thunk
 */
const addScreenMessage = (text, params) => dispatch => {
    dispatch(
        addMessageAction({
            ...messageDefaults,
            id: uid('log'),
            type: SCREEN_MESSAGE_TYPE,
            text,
            params,
        })
    );
};

export default addScreenMessage;
