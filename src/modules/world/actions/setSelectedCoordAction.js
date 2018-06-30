/**
 * An action creator that sets the currently selected coord.
 * @param {number[]} coord A coord
 * @returns {Object} A redux action
 */
const setSelectedCoordAction = (
    coord,
) => ({
    type: `${setSelectedCoordAction}`,
    payload: { coord }
});

setSelectedCoordAction.toString = () => 'world/set selected coord';

export default setSelectedCoordAction;
