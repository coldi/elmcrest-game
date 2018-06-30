/**
 * An action creator that merges field objects into the map state.
 * @param {Object[]} fields An array of fields to be added.
 * @returns {Object} A redux action
 */
const mergeMapFieldsAction = (
    fields
) => ({
    type: `${mergeMapFieldsAction}`,
    payload: { fields }
});

mergeMapFieldsAction.toString = () => 'world/merge map fields';

export default mergeMapFieldsAction;
