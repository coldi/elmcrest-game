import { updateSceneAction } from '../modules/world';

/**
 * Performs scene related actions.
 */
export default function scene (dispatch) {
    dispatch(updateSceneAction({
        viewWidth: window.innerWidth,
        viewHeight: window.innerHeight,
    }));
}
