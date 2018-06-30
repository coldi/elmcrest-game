const map = new Map();

export default {
    /**
     * Returns a promise and stores the related resolve/reject
     * callbacks under the given id.
     * @param {string} id
     * @returns {Promise<any>}
     */
    create (id) {
        return new Promise((resolve, reject) => {
            map.set(id, {
                resolve,
                reject,
            });
        });
    },
    /**
     * Resolves the promise for the given id with an optional result.
     * @param {string} id
     * @param {*} [result]
     */
    resolve (id, result) {
        map.get(id).resolve(result);
        map.delete(id);
    },
    /**
     * Rejects the promise for the given id.
     * @param {string} id
     * @param {Error} err
     */
    reject (id, err) {
        map.get(id).reject(err);
        map.delete(id);
    },
};
