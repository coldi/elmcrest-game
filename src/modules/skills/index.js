import reducers from './reducers';

export default reducers;

export { default as getSkillById } from './selectors/getSkillById';
export { default as getSkillsList } from './selectors/getSkillsList';
export { default as getSkillTree } from './selectors/getSkillTree';

export { default as applySkill } from './actions/applySkill';
export { default as registerSkill } from './actions/registerSkill';
export { default as setSkillTreeAction } from './actions/setSkillTreeAction';
