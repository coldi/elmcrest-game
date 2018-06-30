/**
 * An action creator that updates the weather state.
 * @param {Object} update An object that gets merged with the weather state.
 * @returns {Object} A redux action
 */
const updateWeatherAction = (update) => ({
    type: `${updateWeatherAction}`,
    payload: { update }
});

updateWeatherAction.toString = () => 'world/update weather';

export default updateWeatherAction;
