import Immutable from 'seamless-immutable';
import invariant from '../../utils/invariant';
import { skillDefaults } from '../definitions';
import registerSkillAction from './registerSkillAction';

/**
 * Registers a skill.
 * @param {Object} props Specific skill props
 * @returns {Function} A redux thunk
 */
const registerSkill = (props = {}) => dispatch => {
    invariant(props.id, 'An id is required to register a skill.');

    const skill = Immutable.merge(skillDefaults, props);

    dispatch(registerSkillAction(skill));

    return skill;
};

export default registerSkill;
