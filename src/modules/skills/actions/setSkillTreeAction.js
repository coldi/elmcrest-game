/**
 * Sets the skill tree.
 * @param {Object} tree The skill tree props
 * @returns {Object} A redux action
 */
const setSkillTreeAction = (tree) => ({
    type: `${setSkillTreeAction}`,
    payload: { tree }
});

setSkillTreeAction.toString = () => 'skills/set skill tree';

export default setSkillTreeAction;
