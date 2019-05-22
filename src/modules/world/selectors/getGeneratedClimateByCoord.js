import makeNoiseGen from '../../procedural/utils/makeNoiseGen';
import getWorldSettings from './getWorldSettings';

/**
 * Generates a field climate value by passing a given coord
 * to a seeded noise generator.
 * @param {Object} state
 * @param {number[]} coord
 * @return {number}
 */
function getGeneratedClimateByCoord(state, coord) {
    const settings = getWorldSettings(state);
    const generator = makeNoiseGen(state, 'field.climate', {
        max: settings.numClimateZones - 1,
        frequency: settings.climateGenFrequency,
    });
    // eslint-disable-next-line no-console
    let biome = generator.scaled2D(coord[0], coord[1]);
    if (biome < 0.75) {
        biome = 0;
    }
    if (biome > 1.25 && biome < 2.5) {
        biome = 2;
    }

    return Math.round(biome);
}

export default getGeneratedClimateByCoord;
