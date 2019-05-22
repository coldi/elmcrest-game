import { MUTATOR_REGEX } from '../constants';

/**
 * Tests if the given effect is of type mutator.
 * A mutator effect mutates something and this mutation will not be
 * undone when the effect ends. It is considered permanent.
 * Mutator effects can do almost anything since they are basically redux thunks.
 * @param {Object} effect
 * @returns {boolean}
 */
const isMutator = effect => MUTATOR_REGEX.test(effect.name);

export default isMutator;
