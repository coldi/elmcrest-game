import getWorldState from './getWorldState';

/**
 * Selects the weather state.
 * @param {Object} state The global state
 * @returns {Object} The weather state
 */
const getWeatherState = (state) => getWorldState(state).weather;

export default getWeatherState;
