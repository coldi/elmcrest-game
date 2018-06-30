import loadScript from '../../utils/loadScript';

/**
 * Returns a effect script for a given id.
 * @param {string} id The id of the effect
 * @returns {Promise<Function>}
 */
const getEffectScriptById = (id) => (
    loadScript(`effects/${id}.js`)
);

export default getEffectScriptById;
