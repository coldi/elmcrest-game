import { STATIC_INVENTORY } from './constants';

/**
 * The inventory default properties.
 * @type {Object}
 */
export const inventoryDefaults = {
    id: null,
    type: STATIC_INVENTORY,
    ownerId: null,
    stacks: {},
};

/**
 * The stack default properties.
 * @type {Object}
 */
export const stackDefaults = {
    id: null,
    item: null,
    amount: 1,
    order: 0,
    equipped: false,
};
