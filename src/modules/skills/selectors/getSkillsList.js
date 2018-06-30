import getSkillsState from './getSkillsState';

/**
 * Selects a list of all registered skills.
 * @param {Object} state The global state
 * @returns {Array} A list of skills
 */
const getSkillsList = (state) => (
    Object.values(getSkillsState(state).byId)
);

export default getSkillsList;
