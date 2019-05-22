import promiseMap from '../../utils/promiseMap';
import extendLocales from '../../i18n/actions/extendLocales';
import getEventByCoord from '../selectors/getEventByCoord';
import { currentEventDefaults } from '../definitions';
import preEventAction from './preEventAction';
import setCurrentEventAction from './setCurrentEventAction';

/**
 * Triggers a new event and returns a promise
 * that will be resolved when the event ends.
 * @param {string} id An event id
 * @param {Object} [coord] The coord of the event if instanciated
 * @return {Function} A redux thunk
 */
const startEvent = (id, coord = null) => async (dispatch, getState) => {
    // dispatch pre event hook in order to make event
    // related preparations (e.g. extending locales).
    dispatch(preEventAction(id));

    await dispatch(extendLocales(`events/${id}/locales`));

    const state = coord
        ? getEventByCoord(getState(), coord).state
        : currentEventDefaults.state;

    dispatch(
        setCurrentEventAction({
            ...currentEventDefaults,
            id,
            coord,
            state,
        })
    );

    return promiseMap.create(id);
};

export default startEvent;
