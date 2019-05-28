/**
 * An action creator that sets the currently active event scene.
 * @param {string} sceneId A scene id
 * @returns {Object} A redux action
 */
const setCurrentEventSceneAction = sceneId => ({
    type: `${setCurrentEventSceneAction}`,
    payload: { sceneId },
});

setCurrentEventSceneAction.toString = () => 'events/set current event scene';

export default setCurrentEventSceneAction;
