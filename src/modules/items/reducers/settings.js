const initialState = {
    // determines how the effects on an item scale per item level
    levelScaleFactor: 1,
    // used to determine random item quality
    qualityChanceConstant: 128,
    // this values indicates the max item drop bonus.
    // if the bonus is >= 1024 only highest quality items are dropped.
    qualityEnvironmentDivisor: 1024,
};

/**
 * The items settings state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function settings(state = initialState, action = {}) {
    switch (action.type) {
        default: {
            return state;
        }
    }
}
