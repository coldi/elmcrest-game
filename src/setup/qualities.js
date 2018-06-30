import { createQualitiesAction } from '../modules/items';
import { qualityDefaults } from '../modules/items/definitions';
import loadCSV from '../modules/utils/loadCSV';

/**
 * Creates item qualities.
 */
export default function qualities (dispatch) {
    return loadCSV('qualities.csv')
        .then(result => result.data)
        .then(data => data.map(({
            weightPrefix,
            weightSuffix,
            weightBoth,
            ...quality
        }) => ({
            ...qualityDefaults,
            ...quality,
            affixWeights: {
                prefix: weightPrefix,
                suffix: weightSuffix,
                'prefix|suffix': weightBoth,
            },
        })))
        .then(createQualitiesAction)
        .then(dispatch);
}
