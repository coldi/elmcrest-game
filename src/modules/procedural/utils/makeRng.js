import seedrandom from 'seedrandom';

/**
 * Inits random number generator with seed value.
 * @param {string|number} seed A seed value
 * @returns {Object}
 */
const makeRng = (seed) => {
    const instance = seedrandom(seed);

    return {
        instance,
        random (num = 1) {
            return instance.quick() * num;
        },
        pick (list) {
            const index = Math.floor(instance.quick() * list.length);
            return list[index];
        },
        shuffle (list) {
            const arr = list.slice(0);

            for (let i = 0; i < arr.length; i += 1) {
                const j = Math.floor(instance.quick() * arr.length);
                const tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }

            return arr;
        },
    };
};

export default makeRng;
