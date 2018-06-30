const load = require.context('scripts', true, /\.js$/);

/**
 * Requires a script file.
 * @param {string} file The path to the file
 * @returns {*} The required file
 */
const requireScripts = (file) => load(`${file}`);

export default requireScripts;
