/**
 * The field default properties.
 * @type {Object}
 */
export const fieldDefaults = {
    coord: [],
    // climate + elevation relate to the corresponding field type
    climate: 0,
    elevation: 0,
    visible: false,
    discovered: false,
};

/**
 * The field type default properties.
 * @type {Object}
 */
export const fieldTypeDefaults = {
    resourceId: null,
    offset: 0,
    climate: 0,
    elevation: 0,
    travelCost: 0,
    waterFactor: 1,
    foodFactor: 1,
    energyFactor: 1,
    temperature: 0,
    humidity: 0,
};
