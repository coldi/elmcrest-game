import Immutable from 'seamless-immutable';
import invariant from '../../utils/invariant';
import { eventMetaDefaults } from '../definitions';
import registerEventAction from './registerEventAction';

/**
 * Registers a event.
 * @param {Object} props Specific event props
 * @returns {Function} A redux thunk
 */
const registerEvent = (
    props = {},
) => (dispatch) => {
    invariant(props.id, 'An id is required to register an event.');

    const event = Immutable.merge(
        eventMetaDefaults,
        props
    );

    dispatch(registerEventAction(event));

    return event;
};

export default registerEvent;
