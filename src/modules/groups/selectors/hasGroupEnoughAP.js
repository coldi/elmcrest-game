import getGroupAP from './getGroupAP';

/**
 * Tests if the given group has more remaining action points than the given cost.
 * @param {Object} state The global state
 * @param {string} id A group id
 * @param {number} cost Some cost
 * @returns {boolean}
 */
const hasGroupEnoughAP = (state, id, cost = 0) => (
    getGroupAP(state, id) >= cost
);

export default hasGroupEnoughAP;
