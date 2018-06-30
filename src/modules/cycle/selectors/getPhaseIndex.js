import getCycleState from './getCycleState';

/**
 * Selects the current phase index.
 * @param {Object} state The global state
 * @returns {number} The current phase index
 */
const getPhaseIndex = (state) => (
    getCycleState(state).cycle.phaseIndex
);

export default getPhaseIndex;
