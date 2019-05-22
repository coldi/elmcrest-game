import { updateWeatherAction } from '../';

const initialState = {
    climate: -1,
    temperature: 0,
    clouds: 0,
    rain: 0,
};

/**
 * The weather state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function scene(state = initialState, action = {}) {
    switch (action.type) {
        case `${updateWeatherAction}`: {
            const { update } = action.payload;

            return { ...state, ...update };
        }

        default: {
            return state;
        }
    }
}
