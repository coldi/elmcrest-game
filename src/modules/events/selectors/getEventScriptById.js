import loadScript from '../../utils/loadScript';

/**
 * Returns a event script for a given id.
 * @param {string} id The id of the event
 * @returns {Promise<Function>}
 */
const getEventScriptById = id => loadScript(`events/${id}/index.js`);

export default getEventScriptById;
