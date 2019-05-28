import getSkillsState from './getSkillsState';

/**
 * Selects the skill tree state.
 * @param {Object} state The global state
 * @returns {Object} The skill tree state
 */
const getSkillTreeState = state => getSkillsState(state).skillTree;

export default getSkillTreeState;
