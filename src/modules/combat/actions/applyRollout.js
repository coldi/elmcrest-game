import applySkill from '../../skills/actions/applySkill';
import isCharacterAlive from '../../characters/selectors/isCharacterAlive.js';
import getCurrentRollout from '../selectors/getCurrentRollout';
import addRolloutAction from './addRolloutAction';
import applyRolloutAction from './applyRolloutAction';
import removeCharacter from './removeCharacter';

/**
 * Applies the current rollout from the rollout stack.
 * @returns {Function} A redux thunk
 */
const applyRollout = () => async (dispatch, getState) => {
    const state = getState();
    const rollout = getCurrentRollout(state);
    const { targetId, originId, result } = rollout;

    if (result) {
        await dispatch(applySkill(result));

        if (!isCharacterAlive(getState(), targetId)) {
            // character died
            dispatch(
                addRolloutAction({
                    stateId: 'dead',
                    delay: 500,
                    targetId,
                    originId,
                })
            );
        }
    }

    dispatch(applyRolloutAction(rollout));

    // handle 'dead state' rollout by removing
    // the target character from battle
    if (rollout.stateId === 'dead') {
        dispatch(removeCharacter(targetId));
    }
};

export default applyRollout;
