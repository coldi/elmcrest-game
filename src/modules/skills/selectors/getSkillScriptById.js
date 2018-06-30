import loadScript from '../../utils/loadScript';

/**
 * Returns a skill script for a given id.
 * @param {string} id The id of the skill
 * @returns {Promise<Function>} A skill function
 */
const getSkillScriptById = (id) => (
    loadScript(`skills/${id}.js`)
);

export default getSkillScriptById;
