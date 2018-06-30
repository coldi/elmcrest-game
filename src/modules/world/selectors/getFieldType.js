import getFieldTypesState from './getFieldTypesState';

/**
 * Selects a field type by climate and elevation key.
 * @param {Object} state The global state
 * @param {number} climate
 * @param {number} elevation
 * @returns {Object}
 */
const getFieldType = (state, climate, elevation) => (
    getFieldTypesState(state)[`${climate}_${elevation}`]
);

export default getFieldType;
