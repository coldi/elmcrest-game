import invariant from '../../utils/invariant';
import promiseMap from '../../utils/promiseMap';
import getGroupById from '../../groups/selectors/getGroupById';
import getCharacterById from '../../characters/selectors/getCharacterById';
import isCharacterAlive from '../../characters/selectors/isCharacterAlive';
import { characterEntryDefaults, groupEntryDefaults } from '../definitions';
import resetCombatAction from './resetCombatAction';
import startBattleAction from './startBattleAction';
import setControlledGroupIdAction from './setControlledGroupIdAction';
import setCurrentBattleAction from './setCurrentBattleAction';
import updateCharacterDelays from './updateCharacterDelays';
import proceedWithBattleQueue from './proceedWithBattleQueue';

const calcInitialDelay = (character) => {
    const { base, condition, computed } = character;
    const ap = computed.APMax - condition.APUsed;
    const delay = 100 - (base.per * ap);

    return Math.max(0, delay);
};

/**
 * Starts a battle between given initiator and opponent group ids.
 * @param {string} initiatorGrpId A group id
 * @param {string} opponentGrpId A group id
 * @param {string} [controlledGrpId] The ui controlled group id
 * @returns {Function} A redux thunk
 */
const startBattle = (
    initiatorGrpId,
    opponentGrpId,
    controlledGrpId
) => (dispatch, getState) => {
    const state = getState();
    const initiator = getGroupById(state, initiatorGrpId);
    const opponent = getGroupById(state, opponentGrpId);

    invariant(initiator, 'Invalid initiator group id.');
    invariant(opponent, 'Invalid opponent group id.');

    dispatch(resetCombatAction());

    const groups = [
        { ...groupEntryDefaults, groupId: initiator.id },
        { ...groupEntryDefaults, groupId: opponent.id },
    ];

    const characters = initiator.characterIds
        .concat(opponent.characterIds)
        .filter((charId) => isCharacterAlive(state, charId))
        .map((charId) => getCharacterById(state, charId))
        .map((char) => ({
            ...characterEntryDefaults,
            characterId: char.id,
            groupId: char.groupId,
            delay: calcInitialDelay(char),
            hasPerformed: false,
        }), {});

    dispatch(setCurrentBattleAction({
        groups,
        characters,
    }));

    if (controlledGrpId) {
        dispatch(setControlledGroupIdAction(controlledGrpId));
    }

    dispatch(startBattleAction());

    // normalize character delays initially
    dispatch(updateCharacterDelays());
    // trigger any upcoming NPC
    // (after an initial timeout, so player can focus on combat situation)
    setTimeout(() => dispatch(proceedWithBattleQueue()), 2500);

    return promiseMap.create('battle');
};

export default startBattle;
