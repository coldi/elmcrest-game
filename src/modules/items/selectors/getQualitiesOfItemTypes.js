import getItemsState from './getItemsState';

/**
 * Groups a given list of item types by their quality.
 * @param {Object} state The global state
 * @param {Array} itemTypes A list of item types
 * @returns {Object}
 */
const getQualitiesOfItemTypes = (state, itemTypes) => {
    const { qualities } = getItemsState(state);

    return Object.keys(qualities).reduce((acc, qualityId) => {
        const itemsWithQuality = itemTypes.filter(item => item[qualityId]);
        return itemsWithQuality.length ? {
            ...acc,
            [qualityId]: itemsWithQuality,
        } : acc;
    }, {});
};

export default getQualitiesOfItemTypes;
