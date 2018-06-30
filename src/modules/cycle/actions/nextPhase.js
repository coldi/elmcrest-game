import { NUM_PHASES } from '../constants';
import setPhaseIndexAction from './setPhaseIndexAction';
import incrementTurnAction from './incrementTurnAction';
import getPhaseIndex from '../selectors/getPhaseIndex';
import getPhaseDoneState from '../selectors/getPhaseDoneState';

/**
 * Proceeds to the next cycle phase.
 * If the next phase index exceeds the amount of implemented phases (most likely 2)
 * it dispatches action for the next turn.
 * @returns {Function} A redux thunk
 */
const nextPhase = () => (dispatch, getState) => {
    const phaseIndex = getPhaseIndex(getState());

    if (phaseIndex + 1 < NUM_PHASES) {
        dispatch(setPhaseIndexAction(phaseIndex + 1));

        if (getPhaseDoneState(getState())) {
            // auto trigger next phase if current phase has no members (is already done)
            requestIdleCallback(() => {
                dispatch(nextPhase());
            });
        }
    } else {
        dispatch(incrementTurnAction());
    }
};

export default nextPhase;
