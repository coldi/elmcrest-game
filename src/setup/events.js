import { registerEvent } from '../modules/events';
import { eventMetaDefaults } from '../modules/events/definitions';
import loadJSON from '../modules/utils/loadJSON';

/**
 * Registers events.
 */
export default function events(dispatch) {
    return loadJSON('events.json')
        .then(data =>
            data.map(event => ({
                ...eventMetaDefaults,
                ...event,
            }))
        )
        .then(events => events.map(event => dispatch(registerEvent(event))));
}
