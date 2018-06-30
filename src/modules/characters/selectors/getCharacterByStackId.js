import getCharactersList from './getCharactersList';
import getEquippedItemsOfCharacter from './getEquippedItemsOfCharacter';

/**
 * Selects a character that wears the given stack id.
 * @param {Object} state The global state
 * @param {string} stackId A stack id
 * @returns {Object} A character object
 */
const getCharacterByStackId = (state, stackId) => {
    const chars = getCharactersList(state);

    return chars.find((char) => (
        Object.values(getEquippedItemsOfCharacter(state, char.id))
            .filter(item => item)
            .some(item => item.stackId === stackId)
    ));
};

export default getCharacterByStackId;
