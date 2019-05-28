import getQueuedEntries from '../selectors/getQueuedEntries';
import getCurrentBattle from '../selectors/getCurrentBattle';
import setCurrentBattleAction from './setCurrentBattleAction';

/**
 * Updates the delay of all characters.
 * If delay is ommited, the delays are only normalized.
 * Meaning: The delay of all characters is reduced by the delay of the first character.
 * So that the first character always has a delay of 0.
 * @param {string} [delay=0] The (relative) delay that should be added to the active character
 * @returns {Function} A redux thunk
 */
const updateCharacterDelays = (delay = 0) => (dispatch, getState) => {
    const currentBattle = getCurrentBattle(getState());
    const entries = currentBattle.characters;

    if (entries.length <= 1) {
        return;
    }

    const queue = getQueuedEntries(getState());
    const [first, second] = queue;

    let nextEntries;
    let nextTurn = currentBattle.turn;

    if (delay) {
        // add delay to first character entry and normalize
        // by subtracting delay of upcoming character (second).
        nextEntries = entries.map(entry => {
            const isFirstEntry = entry.characterId === first.characterId;
            // mark active character as 'hasPerformed'
            const hasPerformed = isFirstEntry || entry.hasPerformed;
            const nextDelay = isFirstEntry
                ? entry.delay - second.delay + delay
                : entry.delay - second.delay;

            return {
                ...entry,
                hasPerformed,
                delay: nextDelay,
            };
        });
        // when every character in battle performed at least once,
        // it is considered a new turn
        if (nextEntries.every(entry => entry.hasPerformed)) {
            // therefore increment the turn of the battle
            nextTurn += 1;
            // reset flag for every character
            nextEntries = nextEntries.map(entry => ({ ...entry, hasPerformed: false }));
        }
    } else {
        // only normalize by subtracting delay of active character (first)
        nextEntries = entries.map(entry => ({
            ...entry,
            delay: entry.delay - first.delay,
        }));
    }

    dispatch(
        setCurrentBattleAction({
            characters: nextEntries,
            turn: nextTurn,
        })
    );
};

export default updateCharacterDelays;
