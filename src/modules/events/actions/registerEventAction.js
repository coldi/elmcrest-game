/**
 * Registers a event.
 * @param {Object} event The event props
 * @returns {Object} A redux action
 */
const registerEventAction = (event) => ({
    type: `${registerEventAction}`,
    payload: { event }
});

registerEventAction.toString = () => 'events/register event';

export default registerEventAction;
