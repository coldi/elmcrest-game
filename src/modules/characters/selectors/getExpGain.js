import getCharactersSettings from './getCharactersSettings';
import getCharacterById from './getCharacterById';
import getExpByLevel from './getExpByLevel';

/**
 * Returns the experience the player may gain by defeating another character.
 * @param {Object} state The global state
 * @param {string} charId The character id that receives exp
 * @param {string} sourceCharId The character id that provides exp
 * @returns {number}
 */
const getExpGain = (state, charId, sourceCharId) => {
    const char = getCharacterById(state, charId);
    const sourceChar = getCharacterById(state, sourceCharId);
    const { baseCharacterExp, expProgressMultiplier } = getCharactersSettings(state);
    // scale with sourceChar's level
    const levelScale = (2 + sourceChar.computed.level) ** 2 * expProgressMultiplier;
    // increase exp if sourceChar is higher level, decrease when lower
    const levelDiff = sourceChar.computed.level / char.computed.level;
    // compute exp
    const exp = Math.floor(
        baseCharacterExp *
            char.progress.expBoost *
            sourceChar.progress.expMultiplier *
            levelScale *
            levelDiff
    );
    // compute max exp limit (never allow 2 level ups at once)
    const maxExp = getExpByLevel(state, char.computed.level + 1.99);

    return Math.min(exp, maxExp);
};

export default getExpGain;
