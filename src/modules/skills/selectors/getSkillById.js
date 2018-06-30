import getSkillsState from './getSkillsState';

/**
 * Selects a skill by a given id.
 * @param {Object} state The global state
 * @param {string} id A skill id
 * @returns {Object} A skill object
 */
const getSkillById = (state, id) => getSkillsState(state).byId[id];

export default getSkillById;
