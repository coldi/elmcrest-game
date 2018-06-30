import getCharactersSettings from './getCharactersSettings';

/**
 * Returns the level for the given experience.
 * @param {Object} state The global state
 * @param {number} exp
 * @returns {number}
 */
const getLevelByExp = (state, exp) => {
    const { expProgressMultiplier } = getCharactersSettings(state);

    return Math.floor(expProgressMultiplier * Math.sqrt(exp)) + 1;
};

export default getLevelByExp;
