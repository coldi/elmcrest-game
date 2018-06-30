const initialState = {
    // Number of turns that correspond to a full day/night cycle
    dayNightCycle: 24,
};

/**
 * The cycle settings state reducer.
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
