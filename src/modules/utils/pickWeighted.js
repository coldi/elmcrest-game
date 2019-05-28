/**
 * Picks an item from the list by weight.
 * The resolveWeight prop can either be a function or an item property key.
 * @param {Object[]} list A list of items
 * @param {Function|string} resolveWeight
 * @returns {Object}
 */
export default function pickWeighted(list, resolveWeight) {
    const weights =
        typeof resolveWeight === 'function'
            ? list.map(resolveWeight)
            : list.map(entry => entry[resolveWeight]);

    const totalWeight = weights.reduce((acc, cur) => acc + cur, 0);

    const rnd = Math.random() * totalWeight;
    let sum = 0;

    for (let i = 0; i < list.length; i += 1) {
        sum += weights[i];
        sum = +sum.toFixed(2);

        if (rnd <= sum) return list[i];
    }

    return null;
}
