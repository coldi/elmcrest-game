import isEqual from 'lodash/isEqual';
import getGroupsList from './getGroupsList';

/**
 * Gets a group by a given coord.
 * @param {Object} state The global state
 * @param {number[]} coord A coord
 * @returns {Object} A group object
 */
const getGroupByCoord = (state, coord = []) =>
    getGroupsList(state).find(group => group && isEqual(group.coord, coord));

export default getGroupByCoord;
