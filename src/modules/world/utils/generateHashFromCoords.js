import getKeyFromCoord from './getKeyFromCoord';

/**
 * Generates a hash object based on the x/y values of the given fields or coords.
 * This can be used for easier lookup or comparison operations.
 * @param {Object} fieldsOrCoords A list of fields or coords
 */
const generateHashFromCoords = fieldsOrCoords =>
    fieldsOrCoords.reduce((hash, fieldOrCoord) => {
        const coord = fieldOrCoord.coord || fieldOrCoord;
        const key = getKeyFromCoord(coord);
        // eslint-disable-next-line  no-param-reassign
        hash[key] = fieldOrCoord;
        return hash;
    }, {});

export default generateHashFromCoords;
