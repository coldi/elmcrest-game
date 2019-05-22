import memoize from '../../utils/memoize';
import getItemsState from './getItemsState';

/**
 * Selects a list of item types.
 * @param {Object} state The global state
 * @returns {Array} A list of types
 */
const getItemTypesList = memoize(getItemsState, state =>
    Object.values(getItemsState(state).itemTypes)
);

export default getItemTypesList;
