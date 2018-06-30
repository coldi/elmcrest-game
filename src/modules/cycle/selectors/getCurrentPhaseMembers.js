import getCycleState from './getCycleState';
import getPhaseIndex from './getPhaseIndex';

/**
 * Selects the current phase (members).
 * @param {Object} state The global state
 * @returns {Object[]} A list of the current phase members
 */
const getCurrentPhaseMembers = (state) => (
    getCycleState(state).cycle.phases[getPhaseIndex(state)]
);

export default getCurrentPhaseMembers;
