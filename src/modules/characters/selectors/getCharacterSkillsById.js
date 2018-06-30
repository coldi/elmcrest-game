import getSkillById from '../../skills/selectors/getSkillById';
import getBaseCharacterById from './getBaseCharacterById';

/**
 * Returns a list of all character skills.
 * @param {Object} state The global state
 * @param {string} id A character id
 * @returns {Array} A list of skills
 */
const getCharacterSkillsById = (state, id) => {
    const character = getBaseCharacterById(state, id);

    return Object.keys(character.skills)
        .filter(skillId => character.skills[skillId])
        .map(skillId => getSkillById(state, skillId));
};

export default getCharacterSkillsById;
