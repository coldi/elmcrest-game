/**
 * An action creator that updates the scene state.
 * @param {Object} update An object that gets merged with the scene state.
 * @returns {Object} A redux action
 */
const updateSceneAction = update => ({
    type: `${updateSceneAction}`,
    payload: { update },
});

updateSceneAction.toString = () => 'world/update scene';

export default updateSceneAction;
