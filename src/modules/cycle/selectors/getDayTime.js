import getCurrentTurn from './getCurrentTurn';
import getCycleSettings from './getCycleSettings';

/**
 * Returns the time of day as a float from 0..1.
 * @param {Object} state The global state
 * @returns {number}
 */
const getDayTime = (state) => {
    const turn = getCurrentTurn(state);
    const { dayNightCycle } = getCycleSettings(state);
    return (turn % dayNightCycle) / dayNightCycle;
};

export default getDayTime;
