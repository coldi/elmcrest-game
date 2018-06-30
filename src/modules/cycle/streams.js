import { store$ } from '../../middleware';
import { PLAYER_PHASE_INDEX, COMPUTE_PHASE_INDEX } from './constants';
import {
    getPhaseIndex,
    getAllPhaseMembers,
    getCurrentPhaseMembers,
    getCurrentTurn,
    setPhaseIndexAction,
    incrementTurnAction,
} from './';

/**
 * A Stream of turn changes.
 */
export const turn$ = store$
    .filter(({ action }) => action.type === `${incrementTurnAction}`)
    .map(input => ({
        ...input,
        turn: getCurrentTurn(input.getState()),
        members: getAllPhaseMembers(input.getState())
    }));

/**
 * A Stream of phase changes.
 */
export const phase$ = store$
    .filter(({ action }) => action.type === `${setPhaseIndexAction}`)
    .merge(turn$)
    .map(input => ({
        ...input,
        phaseIndex: getPhaseIndex(input.getState()),
        phaseMembers: getCurrentPhaseMembers(input.getState())
    }));

/**
 * A Stream of player phases.
 */
export const playerPhase$ = phase$.filter(
    ({ phaseIndex }) => phaseIndex === PLAYER_PHASE_INDEX
);

/**
 * A Stream of compute phases.
 */
export const computePhase$ = phase$.filter(
    ({ phaseIndex }) => phaseIndex === COMPUTE_PHASE_INDEX
);
