import calcCoordsBetweenCorners from '../utils/calcCoordsBetweenCorners';
import getSceneState from '../selectors/getSceneState';
import getCachedFieldByCoord from '../selectors/getCachedFieldByCoord';
import getWorldSettings from '../selectors/getWorldSettings';
import updateSceneAction from './updateSceneAction';

/**
 * Computes and updates the list of currently visible coords in the viewport.
 * @returns {Function} A redux thunk
 */
const setCoordsInView = () => (dispatch, getState) => {
    const state = getState();
    const { boundingCoords } = getSceneState(state);
    const { visibleCoordsOffset } = getWorldSettings(state);

    // compute all coords that are in the rect described by boundingCoords
    const coordsInView = calcCoordsBetweenCorners(boundingCoords, visibleCoordsOffset)
        // filter coords that are visible and discovered
        .filter((coord) => {
            const { visible, discovered } = getCachedFieldByCoord(state, coord);
            return (visible || discovered);
        });

    // dispatch all coords that are relevant to the view
    dispatch(updateSceneAction({ coordsInView }));
};

export default setCoordsInView;
