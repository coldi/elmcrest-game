import getEventByCoord from '../selectors/getEventByCoord';
import getCachedEventByCoord from '../selectors/getCachedEventByCoord';
import createEventAtCoord from './createEventAtCoord';

/**
 * Creates generated world events for specific field coords.
 * @param {Array} fields A list of fields
 * @returns {Function} A redux thunk
 */
const createEventsByFields = fields => (dispatch, getState) => {
    fields.forEach(({ coord }) => {
        const event = getEventByCoord(getState(), coord);
        if (event) return;

        const generatedEvent = getCachedEventByCoord(getState(), coord);
        if (generatedEvent) {
            dispatch(createEventAtCoord(generatedEvent));
        }
    });
};

export default createEventsByFields;
