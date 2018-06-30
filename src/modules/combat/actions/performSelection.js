import getCombatUIState from '../selectors/getCombatUIState';
import getRolloutsForSelection from '../selectors/getRolloutsForSelection';
import addRolloutAction from './addRolloutAction';

/**
 * Performs the given selection or falls back to the currently active UI selection.
 * @param {Object} [selection] The selection to perform
 * @returns {Function} A redux thunk
 */
const performSelection = (selection = null) => async (dispatch, getState) => {
    const state = getState();
    const ui = getCombatUIState(state);
    const usedSelection = selection || ui.selection;

    (await getRolloutsForSelection(state, usedSelection))
        .map(addRolloutAction)
        .forEach(dispatch);
};

export default performSelection;
