import getWorldState from './getWorldState';

/**
 * Selects the map state.
 * @param {Object} state The global state
 * @returns {Object} The map state
 */
const getMapState = state => getWorldState(state).map;

export default getMapState;
