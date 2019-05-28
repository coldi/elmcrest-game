import { registerSkill, setSkillTreeAction } from '../modules/skills';
import { skillDefaults } from '../modules/skills/definitions';
import loadJSON from '../modules/utils/loadJSON';

/**
 * Registers skills and skill tree.
 */
export default async function skills(dispatch) {
    await loadJSON('skills.json')
        .then(data =>
            data.map(skill => ({
                ...skillDefaults,
                ...skill,
            }))
        )
        .then(skills => skills.map(skill => dispatch(registerSkill(skill))));

    await loadJSON('skill-tree.json').then(tree => dispatch(setSkillTreeAction(tree)));
}
