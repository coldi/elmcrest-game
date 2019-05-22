import memoize from '../../utils/memoize';
import { SCREEN_MESSAGE_TYPE } from '../constants';
import getLogState from './getLogState';

/**
 * Returns a list of screen messages.
 * @param {Object} state The global state
 * @returns {Array} A list of screen messages
 */
const getScreenMessages = memoize(getLogState, state =>
    getLogState(state).filter(({ type }) => type === SCREEN_MESSAGE_TYPE)
);

export default getScreenMessages;
