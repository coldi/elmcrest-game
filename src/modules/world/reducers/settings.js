const initialState = {
    // Maximum number of steps a path gets highlighted
    pathHighlightLength: 20,
    // The corner offset for the calculation of screen coords
    visibleCoordsOffset: 4,
    // Number of different climate zones (like desert or snow)
    numClimateZones: 4,
    // Number of different elevation zones (like plains or mountains)
    numElevationZones: 5,
    // Elevation limit that interrupts line of sight
    elevationSightLimit: 4,
    // Mountain ratio for proc gen
    mountainRatio: 0.25,
    // Water ratio for proc gen
    waterRatio: 0.2,
    // Proc gen settings
    climateGenFrequency: 0.015,
    elevationGenFrequency: 0.175,
    elevationGenOctaves: 2,
    elevationGenPersistence: 0.1,
    // Number of turns that correspond to a full day/night cycle
    dayNightCycle: 24,
};

/**
 * The world settings state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function settings (
    state = initialState,
    action = {}
) {
    switch (action.type) {
        default: {
            return state;
        }
    }
}
