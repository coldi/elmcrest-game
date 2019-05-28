import getCachedFieldByCoord from '../selectors/getCachedFieldByCoord';
import mergeMapFieldsAction from './mergeMapFieldsAction';

/**
 * Collects fields that changed their visibility and updates their state in the map.
 * @param {Array[]} appearingCoords A list of coords that did appear
 * @param {Array[]} vanishingCoords A list of coords that did disappear
 * @returns {Function} A redux thunk
 */
const mergeMapFields = (appearingCoords, vanishingCoords) => (dispatch, getState) => {
    const state = getState();

    // prepare update for appearing fields, setting them to visible
    const appearingFields = appearingCoords.map(coord => {
        const field = getCachedFieldByCoord(state, coord);
        return { ...field, visible: true, discovered: true };
    });

    // prepare update for vanishing fields, setting them to invisible
    const vanishingFields = vanishingCoords.map(coord => {
        const field = getCachedFieldByCoord(state, coord);
        return { ...field, visible: false, discovered: true };
    });

    // merge both field updates
    const fieldsUpdate = appearingFields.concat(vanishingFields);

    dispatch(mergeMapFieldsAction(fieldsUpdate));
};

export default mergeMapFields;
