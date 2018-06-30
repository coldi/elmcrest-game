import { INITIAL_SCENE_ID } from './constants';

/**
 * The event's default meta properties.
 * Meta information describe an event.
 * @type {Object}
 */
export const eventMetaDefaults = {
    id: null,
    resourceId: null,
    spawnConditions: false,
};

/**
 * The event instance default properties.
 * Instance information can contain a coord in the world or
 * parameters for this specific event.
 * @type {Object}
 */
export const eventInstanceDefaults = {
    id: null,
    instanceId: null,
    coord: [],
    active: true,
    state: null,
    params: {},
};

/**
 * The current event default properties.
 * Contains the props of a currently running event.
 * @type {Object}
 */
export const currentEventDefaults = {
    id: null,
    actions: [], // action ids
    scenes: [INITIAL_SCENE_ID],
    state: null,
    coord: null, // event instance coord
};
