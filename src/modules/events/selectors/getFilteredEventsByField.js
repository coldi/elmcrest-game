/**
 * Filters events based on a given field's climate and elevation.
 * @param {Object} state
 * @param {Array} events
 * @param {Object} field
 * @returns {Array}
 */
const getFilteredEventsByField = (state, events, field) => (
    events.filter((event) => {
        if (typeof event.spawnConditions !== 'object') return true;

        const { climates } = event.spawnConditions;

        for (const climate of Object.keys(climates)) {
            if (field.climate === Number(climate)) {
                const elevations = climates[climate];
                if (Array.isArray(elevations)) {
                    return elevations.includes(field.elevation);
                } else if (elevations) return true;
            }
        }

        return false;
    })
);

export default getFilteredEventsByField;
