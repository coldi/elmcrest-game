import min from 'lodash/min';
import getGroupCharacters from './getGroupCharacters';

/**
 * Returns the lowest capacity of action points from a group's characters.
 * @param {Object} state The global state
 * @param {string} id A group id
 * @returns {number} The lowest action point capacity
 */
const getGroupAPMax = (state, id) =>
    min(getGroupCharacters(state, id).map(char => char.computed.APMax));

export default getGroupAPMax;
