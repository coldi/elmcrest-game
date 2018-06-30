import isCharacterAlive from '../../characters/selectors/isCharacterAlive';
import getCombatUIState from '../selectors/getCombatUIState';
import getQueuedEntries from '../selectors/getQueuedEntries';
import makeSelection from './makeSelection';

/**
 * Evaluates the upcoming character entry and performs actions if it's an active NPC.
 * @returns {Function} A redux thunk
 */
const proceedWithBattleQueue = () => (dispatch, getState) => {
    const queue = getQueuedEntries(getState());
    const [next] = queue;
    const { controlledGroupId } = getCombatUIState(getState());

    // skip if there is no next entry
    if (!next) return;
    // skip if next entry character is player controlled
    if (next.groupId === controlledGroupId) return;
    // skip if char is dead, but not yet removed
    if (!isCharacterAlive(getState(), next.characterId)) return;

    // otherwise make selections for next NPC
    // by finding a proper target
    const target = queue.find((entry) => (
        entry.groupId !== next.groupId &&
        isCharacterAlive(getState(), entry.characterId)
    ));

    if (!target) return;

    // TODO: write sophisticated algorithm to compute selection
    dispatch(makeSelection('skillId', 'attack'));
    dispatch(makeSelection('characterId', target.characterId));
};

export default proceedWithBattleQueue;
