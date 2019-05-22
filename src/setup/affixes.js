import { createAffixesAction } from '../modules/items';
import { affixDefaults } from '../modules/items/definitions';
import loadCSV from '../modules/utils/loadCSV';
import transformEffects from './utils/transformEffects';

/**
 * Creates affixes.
 */
export default function affixes(dispatch, getState) {
    const state = getState();

    return loadCSV('affixes.csv')
        .then(result => result.data)
        .then(data =>
            data.map(affix => ({
                ...affixDefaults,
                ...affix,
                effects: transformEffects(state, affix.effects),
            }))
        )
        .then(createAffixesAction)
        .then(dispatch);
}
