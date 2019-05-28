import invariant from '../../utils/invariant';
import getSkillById from '../../skills/selectors/getSkillById';
import getCombatUIState from '../selectors/getCombatUIState';
import makeSelectionAction from './makeSelectionAction';
import performSelection from './performSelection';

/**
 * Makes a battle selection and when all necessary selections are made
 * it proceeds with their performance.
 * @param {string} key The selection to update
 * @param {*} value A value
 * @returns {Function} A redux thunk
 */
const makeSelection = (key, value) => (dispatch, getState) => {
    const ui = getCombatUIState(getState());

    invariant(key in ui.selection, `Unknown combat UI selection key '${key}'.`);

    dispatch(makeSelectionAction(key, value));

    const { selection } = getCombatUIState(getState());

    if (selection.skillId) {
        const skill = getSkillById(getState(), selection.skillId);

        if (!skill.targetSelection || selection.characterId) {
            dispatch(performSelection());
        }
    }
};

export default makeSelection;
