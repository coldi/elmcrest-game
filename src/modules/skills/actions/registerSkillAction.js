/**
 * Registers a skill.
 * @param {Object} skill The skill props
 * @returns {Object} A redux action
 */
const registerSkillAction = skill => ({
    type: `${registerSkillAction}`,
    payload: { skill },
});

registerSkillAction.toString = () => 'skills/register skill';

export default registerSkillAction;
