import memoize from '../../utils/memoize';
import getCycleState from './getCycleState';

/**
 * Selects a combined list of the members of all phases.
 * @param {Object} state The global state
 * @returns {Object[]} A list of all phase members
 */
const getAllPhaseMembers = memoize(
    getCycleState,
    (state) => (
        getCycleState(state).cycle.phases.reduce(
            (list, phase) => list.concat(phase),
            []
        )
    )
);

export default getAllPhaseMembers;
