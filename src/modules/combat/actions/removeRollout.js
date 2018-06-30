import getCurrentRollout from '../selectors/getCurrentRollout';
import getSkillById from '../../skills/selectors/getSkillById';
import removeRolloutAction from './removeRolloutAction';
import resetSelectionAction from './resetSelectionAction';
import updateCharacterDelays from './updateCharacterDelays';
import proceedWithBattleQueue from './proceedWithBattleQueue';

/**
 * Removes the current rollout from the rollout stack and updates character delays.
 * @returns {Function} A redux thunk
 */
const removeRollout = () => (dispatch, getState) => {
    const state = getState();
    const { skillId, skipDelayUpdate } = getCurrentRollout(state);

    dispatch(removeRolloutAction());

    if (skillId && !skipDelayUpdate) {
        const skill = getSkillById(state, skillId);
        // reset current skill selection
        dispatch(resetSelectionAction());
        // update character delays
        dispatch(updateCharacterDelays(skill.cost));
    }

    // if there are no rollouts left,
    // proceed by triggering any upcoming NPC
    if (!getCurrentRollout(getState())) {
        dispatch(proceedWithBattleQueue());
    }
};

export default removeRollout;
