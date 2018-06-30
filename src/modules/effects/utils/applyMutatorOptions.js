import clamp from 'lodash/clamp';

/**
 * Applies options like round or clamp to a numeric value.
 * @param {number} num
 * @param {Object} options
 * @returns {number}
 */
const applyMutatorOptions = (num, options = {}) => {
    let result = num;

    if (options.round) result = Math.round(result);
    if (options.clamp) result = clamp(result, ...options.clamp);

    return result;
};

export default applyMutatorOptions;
