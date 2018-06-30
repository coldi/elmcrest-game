const initialState = {
    playerId: 'player',
    expProgressMultiplier: 0.1,
    baseCharacterExp: 30,
    baseResourceConsumption: {
        water: 0.075,
        food: 0.05,
        energy: 0.05,
    },
};

/**
 * The characters settings state reducer.
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
