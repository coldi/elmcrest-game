import getCurrentPhaseMembers from './getCurrentPhaseMembers';

/**
 * Tests if the given group if a member in the current phase.
 * @param {Object} state The global state
 * @param {string} groupId A group id
 * @returns {boolean}
 */
const isMemberInCurrentPhase = (state, groupId) =>
    getCurrentPhaseMembers(state).some(member => member.groupId === groupId);

export default isMemberInCurrentPhase;
