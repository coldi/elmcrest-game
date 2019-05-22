import pickWeighted from '../../utils/pickWeighted';
import getAffixesByConditions from '../selectors/getAffixesByConditions';

/**
 * Higher order function that returns an affix generator function
 * that accepts type (prefix|suffix) and number of affixes to generate.
 * @param {Object} state The global state
 * @param {Object} item The item object for which the affixes are created
 * @returns {Function} An affix generator
 */
const makeAffixGenerator = (state, item) => (type, num = 1) =>
    Array.from({ length: num }).reduce(list => {
        const excludedIds = list.reduce((acc, affixes = []) => acc.concat(affixes), []);
        const pool = getAffixesByConditions(state, {
            ...item,
            [type]: true,
            excludedIds,
        });
        const picked = pickWeighted(pool, 'rarity');

        return picked ? [...list, picked.id] : list;
    }, []);

export default makeAffixGenerator;
