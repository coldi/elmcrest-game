import getCycleState from './getCycleState';

/**
 * Selects the cycle settings.
 * @param {Object} state The global state
 * @returns {Object}
 */
const getCycleSettings = state => getCycleState(state).settings;

export default getCycleSettings;
