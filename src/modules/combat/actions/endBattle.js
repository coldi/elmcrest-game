import promiseMap from '../../utils/promiseMap';
import getCurrentBattleResult from '../selectors/getCurrentBattleResult';
import addBattleToHistoryAction from './addBattleToHistoryAction';
import setCurrentBattleAction from './setCurrentBattleAction';
import endBattleAction from './endBattleAction';
import showResultAction from './showResultAction';

/**
 * Ends a battle by showing the result to the player or by dismissing the result.
 * @param {boolean} dismissResult A flag whether the result screen should be dismissed/skipped
 * @returns {Function} A redux thunk
 */
const endBattle = (dismissResult) => (dispatch, getState) => {
    const result = getCurrentBattleResult(getState());

    if (result.victory !== null) dispatch(addBattleToHistoryAction(result));

    if (!dismissResult && result.victory) {
        dispatch(setCurrentBattleAction({ active: false }));
        dispatch(showResultAction(true));
    } else {
        dispatch(setCurrentBattleAction(null));
        dispatch(endBattleAction(result));
        dispatch(showResultAction(false));
        promiseMap.resolve('battle', result);
    }
};

export default endBattle;
