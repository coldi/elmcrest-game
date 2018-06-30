/**
 * Loads a json file.
 * @param {string} file
 * @return {Promise<*>}
 */
export default function loadJSON (file) {
    return fetch(`assets/payloads/${file}`).then(res => res.json());
}
