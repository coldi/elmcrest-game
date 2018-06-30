import { MODIFIER_REGEX } from '../constants';

/**
 * Tests if the given effect is of type modifier.
 * A modifier effect only modifies one character attribute temporary as long
 * as the effect is active.
 * When the effect gets removed the attribute will again have it's original value.
 * Modifier effects are defined only by the effect name. Like so: '+base.str'
 * @see MODIFIER_REGEX
 * @param {Object} effect
 * @returns {boolean}
 */
const isModifier = (effect) => (
    MODIFIER_REGEX.test(effect.name)
);

export default isModifier;
