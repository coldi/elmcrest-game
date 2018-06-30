import min from 'lodash/min';
import getGroupCharacters from './getGroupCharacters';

/**
 * Returns the lowest amount of remaining action points from a group's characters.
 * @param {Object} state The global state
 * @param {string} id A group id
 * @returns {number} The lowest action point capacity
 */
const getGroupAP = (state, id) => (
    min(
        getGroupCharacters(state, id).map(
            char => char.computed.AP
        )
    )
);

export default getGroupAP;
