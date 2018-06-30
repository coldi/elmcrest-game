import sortBy from 'lodash/sortBy';
import memoize from '../../utils/memoize';
import getCurrentBattle from './getCurrentBattle';

/**
 * Selects queue of character entries according to their current delay.
 * @param {Object} state The global state
 * @returns {Array} An ordered list of character entries.
 */
const getQueuedEntries = memoize(
    getCurrentBattle,
    (state) => (
        sortBy(
            getCurrentBattle(state).characters,
            ['delay']
        )
    )
);

export default getQueuedEntries;
