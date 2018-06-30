import invariant from '../utils/invariant';

export const registry = new Map();

/**
 * Adds an effect by name to the local effect registration cache.
 * This is necessary for mutator effects so they can be referenced within the state.
 * @param {string} name
 * @param {Function} effect
 */
export default function registerEffect (name, effect) {
    invariant(name, `An effect name needs to be specified. Received: ${name}`);
    invariant(typeof effect === 'function', `Effect needs to be a function. Received: ${effect}`);
    invariant(!registry.has(name), `Cannot register effect '${name}'. Effect is already registered.`);

    registry.set(name, effect);
}
