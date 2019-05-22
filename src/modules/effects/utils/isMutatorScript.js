import { MUTATOR_SCRIPT_REGEX } from '../constants';

/**
 * Tests if the given effect refers to a mutator effect script.
 * @param {Object} effect
 * @returns {boolean}
 */
const isMutatorScript = effect => MUTATOR_SCRIPT_REGEX.test(effect.name);

export default isMutatorScript;
