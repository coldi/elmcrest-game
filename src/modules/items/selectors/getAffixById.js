import getItemsState from './getItemsState';

/**
 * Selects an affix by id.
 * @param {Object} state The global state
 * @param {string} id An affix id
 * @returns {Object} An affix object
 */
const getAffixById = (state, id) => (
    getItemsState(state).affixes[id]
);

export default getAffixById;
