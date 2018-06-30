import {
    turn$,
    playerPhase$,
    computePhase$,
} from '../cycle/streams';
import {
    battleDidStart$,
    skillPerformed$,
    characterStateChanged$,
} from '../combat/streams';
import { playerLevelUp$ } from '../characters/streams';
import { getCharacterById } from '../characters';
import { addLogMessage, addScreenMessage } from './';

/**
 * Subscription wrapper.
 * @param {Function} subscribe
 */
export default function (subscribe) {
    subscribe(turn$, ({ dispatch, turn }) => {
        dispatch(addLogMessage('ui.messages.newTurnBegins', { turn }));
    });

    subscribe(playerPhase$, ({ dispatch }) => {
        dispatch(addScreenMessage('ui.messages.playerPhase'));
    });

    subscribe(computePhase$, ({ dispatch }) => {
        dispatch(addScreenMessage('ui.messages.computePhase'));
    });

    subscribe(battleDidStart$, ({ dispatch }) => {
        dispatch(addLogMessage('combat.battleBegin'));
    });

    subscribe(skillPerformed$, ({ dispatch, getState, rollout }) => {
        // TODO: refactor this in some extra function
        const [impact] = rollout.result;
        const formatNumber = num => num >= 10 ? Math.round(num) : num.toFixed(2);
        const effectArgs = impact.effects.reduce((acc, effect, i) => ({
            ...acc,
            [`effect${i}`]: formatNumber(effect.value),
        }), {});

        dispatch(
            addLogMessage(`skills.${rollout.skillId}.usage`, {
                origin: getCharacterById(getState(), rollout.originId).name,
                target: getCharacterById(getState(), rollout.targetId).name,
                ...effectArgs,
            })
        );
    });

    subscribe(characterStateChanged$, ({ dispatch, getState, rollout }) => {
        dispatch(
            addLogMessage(`combat.states.${rollout.stateId}`, {
                origin: getCharacterById(getState(), rollout.originId).name,
                target: getCharacterById(getState(), rollout.targetId).name,
            })
        );
    });

    subscribe(playerLevelUp$, ({ dispatch, level }) => {
        dispatch(addScreenMessage('ui.messages.levelUp'));
        dispatch(addLogMessage('ui.messages.levelReached', { level }));
    });
}
