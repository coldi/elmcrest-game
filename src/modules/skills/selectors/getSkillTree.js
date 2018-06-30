import memoize from '../../utils/memoize';
import getSkillsState from './getSkillsState';
import getSkillTreeState from './getSkillTreeState';
import getSkillById from './getSkillById';

const populate = (state, branch = []) => (
    branch.map(skill => ({
        ...skill,
        ...getSkillById(state, skill.id),
        children: populate(state, skill.children)
    }))
);

/**
 * Selects the skill tree state.
 * @param {Object} state The global state
 * @returns {Object} The skill tree state
 */
const getSkillTree = memoize(
    getSkillsState,
    (state) => populate(state, getSkillTreeState(state))
);

export default getSkillTree;
