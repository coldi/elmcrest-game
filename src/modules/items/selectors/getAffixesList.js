import memoize from '../../utils/memoize';
import getItemsState from './getItemsState';

/**
 * Selects a list of affixes.
 * @param {Object} state The global state
 * @returns {Array} A list of affixes
 */
const getAffixesList = memoize(getItemsState, state =>
    Object.values(getItemsState(state).affixes)
);

export default getAffixesList;
