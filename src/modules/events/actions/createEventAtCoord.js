import invariant from '../../utils/invariant';
import uid from '../../utils/uid';
import { eventInstanceDefaults } from '../definitions';
import createEventAtCoordAction from './createEventAtCoordAction';

/**
 * Adds an event to a coord.
 * @param {Object} props Specific event props
 * @returns {Function} A redux thunk
 */
const createEventAtCoord = (props = {}) => dispatch => {
    invariant(props.id, 'An id is required to add an event instance.');
    invariant(props.coord, 'A coord is required to add an event instance.');

    const event = {
        ...eventInstanceDefaults,
        ...props,
    };

    if (!event.instanceId) {
        event.instanceId = uid('event');
    }

    dispatch(createEventAtCoordAction(event));

    return event;
};

export default createEventAtCoord;
