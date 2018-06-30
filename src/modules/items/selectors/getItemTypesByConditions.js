import filter from 'lodash/filter';
import getItemTypesList from './getItemTypesList';

/**
 * Filters all available item types from state by the given conditions.
 * @param {Object} state The global state
 * @param {Object} conditions
 * @returns {Array}
 */
const getItemTypesByConditions = (state, conditions) => (
    filter(getItemTypesList(state), conditions)
);

export default getItemTypesByConditions;
