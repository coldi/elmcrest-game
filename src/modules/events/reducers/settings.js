const initialState = {
    globalChance: 0.175,
    noiseGenFrequency: 0.75,
    uniqueWithinDistance: 6,
};

/**
 * The events settings state reducer.
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
