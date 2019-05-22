import { updateSceneAction } from '../';

const initialState = {
    cameraPosition: [0, 0],
    cameraOffset: [0, 1], // uses only ..offset[1] for now
    coordsInView: [],
    boundingCoords: [],
    selectedCoord: null,
    viewWidth: 1280,
    viewHeight: 720,
};

/**
 * The scene state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function scene(state = initialState, action = {}) {
    switch (action.type) {
        case `${updateSceneAction}`: {
            const { update } = action.payload;

            return {
                ...state,
                ...update,
            };
        }

        default: {
            return state;
        }
    }
}
