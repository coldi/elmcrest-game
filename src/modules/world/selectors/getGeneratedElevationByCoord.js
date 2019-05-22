import clamp from 'lodash/clamp';
import makeNoiseGen from '../../procedural/utils/makeNoiseGen';
import getWorldSettings from './getWorldSettings';

/**
 * Generates a field elevation value by passing a given coord
 * to a seeded noise generator.
 * @param {Object} state
 * @param {number[]} coord
 * @return {number}
 */
const getGeneratedElevationByCoord = (state, coord) => {
    const settings = getWorldSettings(state);
    const maxElevation = settings.numElevationZones - 1;
    const generator = makeNoiseGen(state, 'field.elevation', {
        max: settings.numElevationZones - 1,
        frequency: settings.elevationGenFrequency,
        octaves: settings.elevationGenOctaves,
        persistence: settings.elevationGenPersistence,
    });

    // perform some not so scientifically correct comparisons
    // and tweak the value of level.
    let level = generator.scaled2D(coord[0], coord[1]);
    if (level < maxElevation * settings.waterRatio) {
        level -= settings.waterRatio;
        level = Math.floor(level);
    } else if (level > maxElevation * (1 - settings.mountainRatio)) {
        level = Math.ceil(level);
    } else {
        level = Math.round(level);
    }

    return clamp(level, 0, maxElevation);
};

export default getGeneratedElevationByCoord;
