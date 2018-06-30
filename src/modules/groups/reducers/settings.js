const initialState = {
    playerGroupId: 'player-group',
    maxCharactersInGroup: 4,
    sightRange: 3,
};

/**
 * The groups settings state reducer.
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
