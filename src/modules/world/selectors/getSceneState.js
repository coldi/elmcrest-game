import getWorldState from './getWorldState';

/**
 * Selects the scene state.
 * @param {Object} state The global state
 * @returns {Object} The scene state
 */
const getSceneState = (state) => getWorldState(state).scene;

export default getSceneState;
