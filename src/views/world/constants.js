/**
 * Size of a hexagonal grid tile.
 * @type {number}
 */
export const TILE_SIZE = 128;

/**
 * The delay (in ms) after which the rendered fields get refreshed.
 * Meaning all the fields that are not visible anymore get removed.
 * @type {number}
 */
export const FIELD_REFRESH_DELAY = 5000;

/**
 * The speed when moving the camera on the x/y axis.
 * @type {number}
 */
export const CAMERA_PAN_SPEED = 20;

/**
 * The speed (steps) when the camera is zooming.
 * @type {number}
 */
export const CAMERA_ZOOM_SPEED = 0.25;

/**
 * The minimum scale of the world when zooming.
 * @type {number}
 */
export const CAMERA_MIN_ZOOM = 0.5;

/**
 * The maximum scale of the world when zooming.
 * @type {number}
 */
export const CAMERA_MAX_ZOOM = 1.5;
