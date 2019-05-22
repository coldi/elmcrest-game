/**
 * An action creator that should be dispatched when player
 * interacts with a coord in the world view (e.g. by mouse click).
 * @param {number[]} coord A coord
 * @returns {Object} A redux action
 */
const interactWithCoord = coord => ({
    type: `${interactWithCoord}`,
    payload: { coord },
    meta: { onlyObserve: true },
});

interactWithCoord.toString = () => 'world/interact with coord';

export default interactWithCoord;
