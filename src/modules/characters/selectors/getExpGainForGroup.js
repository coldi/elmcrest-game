import getGroupById from '../../groups/selectors/getGroupById';
import isCharacterAlive from './isCharacterAlive';
import getExpGain from './getExpGain';

/**
 * Returns the experiences gained from one group defeating another group.
 * Only dead characters provide experience.
 * @param {Object} state The global state
 * @param {string} groupId The group id that receives exp
 * @param {string} sourceGroupId The group id that provides exp
 * @returns {number[]}
 */
const getExpGainForGroup = (state, groupId, sourceGroupId) => {
    const group = getGroupById(state, groupId);
    const sourceGroup = getGroupById(state, sourceGroupId);

    return group.characterIds.map(charId =>
        sourceGroup.characterIds
            // only consider dead characters
            .filter(sourceCharId => !isCharacterAlive(state, sourceCharId))
            .map(sourceCharId => getExpGain(state, charId, sourceCharId))
            .reduce((sum, exp) => sum + exp, 0)
    );
};

export default getExpGainForGroup;
