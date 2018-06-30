import getCharactersSettings from './getCharactersSettings';

/**
 * Returns the experience for a given level.
 * @param {Object} state The global state
 * @param {number} level
 * @returns {number}
 */
const getExpByLevel = (state, level) => {
    const { expProgressMultiplier } = getCharactersSettings(state);

    return Math.round(((level - 1) / expProgressMultiplier) ** 2);
};

export default getExpByLevel;
