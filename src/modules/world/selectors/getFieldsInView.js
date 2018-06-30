import memoize from '../../utils/memoize';
import getSceneState from './getSceneState';
import getCachedFieldByCoord from './getCachedFieldByCoord';
import getFieldType from './getFieldType';

/**
 * Gets all fields that are currently visible and
 * adds field type information for view rendering.
 * @param {Object} state The global state
 * @returns {Object[]} A list of fields
 */
const getFieldsInView = memoize(
    getSceneState,
    (state) => {
        // TODO: is there a way to not use coordsInView anymore?
        // fields can also be derived from group coord + range neighbors.
        // maybe memoization over more than 1 reference is necessary.

        const { coordsInView } = getSceneState(state);
        return coordsInView
            .map(coord => getCachedFieldByCoord(state, coord))
            .map(field => ({
                ...field,
                fieldType: getFieldType(state, field.climate, field.elevation)
            }));
    }
);

export default getFieldsInView;
