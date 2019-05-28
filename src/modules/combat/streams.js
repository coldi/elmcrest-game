import { store$ } from '../../middleware';
import {
    startBattleAction,
    endBattleAction,
    setCurrentBattleAction,
    applyRolloutAction,
    getBattleTurn,
} from './';

/**
 * Emits when a battle did start.
 */
export const battleDidStart$ = store$.filter(
    ({ action }) => action.type === `${startBattleAction}`
);

/**
 * Emits when a battle did end.
 */
export const battleDidEnd$ = store$
    .filter(({ action }) => action.type === `${endBattleAction}`)
    .map(input => ({
        ...input,
        ...input.action.payload,
    }));

/**
 * Emits on every next turn of the battle.
 */
export const battleTurn$ = store$.filter(
    ({ action, getState, prevState }) =>
        action.type === `${setCurrentBattleAction}` &&
        getBattleTurn(getState()) > getBattleTurn(prevState)
);

/**
 * Emits on every new rollout.
 */
export const rolloutApplied$ = store$
    .filter(({ action }) => action.type === `${applyRolloutAction}`)
    .map(input => ({
        ...input,
        rollout: input.action.payload.rollout,
    }));

/**
 * Emits when a character performed a skill based on rollout.
 */
export const skillPerformed$ = rolloutApplied$.filter(
    ({ rollout }) => !!rollout.skillId && !!rollout.result
);

/**
 * Emits when a character's state changed based on rollout.
 */
export const characterStateChanged$ = rolloutApplied$.filter(
    ({ rollout }) => !!rollout.stateId
);
