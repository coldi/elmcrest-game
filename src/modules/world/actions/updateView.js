import differenceWith from 'lodash/differenceWith';
import getPlayerGroup from '../../groups/selectors/getPlayerGroup';
import getGroupsVisibleCoords from '../../groups/selectors/getGroupsVisibleCoords';
import getGroupsRangeCoords from '../../groups/selectors/getGroupsRangeCoords';
import compareCoords from '../utils/compareCoords';
import mergeMapFields from './mergeMapFields';
import setCoordsInView from './setCoordsInView';
import updateSceneAction from './updateSceneAction';

/**
 * Temporary cache for last range coords.
 * @type {Array}
 */
let rangeCoordsCache = [];

/**
 * A thunk that computes updates to fields based on current visibility.
 * Visibility is calculated from a radius around player's cell position.
 * @param {Array[]} boundingCoords A set of four corners that describe the screens rectangle
 * @returns {Function} A redux thunk
 */
const updateView = (boundingCoords) => (dispatch, getState) => {
    const state = getState();

    // calc visible coords based on player's group position
    const player = getPlayerGroup(state);
    const visibleCoords = getGroupsVisibleCoords(state, player.id);
    const rangeCoords = getGroupsRangeCoords(state, player.id);
    const combinedRangeCoords = rangeCoords.concat(rangeCoordsCache);

    // calc appearing and vanishing coords
    const vanishingCoords = differenceWith(combinedRangeCoords, visibleCoords, compareCoords);

    if (boundingCoords) dispatch(updateSceneAction({ boundingCoords }));

    dispatch(mergeMapFields(visibleCoords, vanishingCoords));

    dispatch(setCoordsInView());

    // update cached coords for next call
    rangeCoordsCache = rangeCoords;
};

export default updateView;
