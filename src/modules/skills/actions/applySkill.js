import invariant from '../../utils/invariant';
import applyEffects from '../../effects/actions/applyEffects';

/**
 * Applies the result from a skill script by applying it's effects to the described targets.
 * @param {Object} skill A skill script result
 * @returns {Object} A redux thunk
 */
const applySkill = skill => dispatch => {
    invariant(
        Array.isArray(skill),
        `The skill script result to apply should be an array. Received: ${typeof skill}`
    );

    return Promise.all(
        skill.map(impact => dispatch(applyEffects(impact.targetId, impact.effects)))
    );
};

export default applySkill;
