import getExpGainForGroup from '../../characters/selectors/getExpGainForGroup';
import getGroupById from '../../groups/selectors/getGroupById';
import getPlayerGroup from '../../groups/selectors/getPlayerGroup';
import getCurrentBattle from './getCurrentBattle';
import { resultDefaults } from '../definitions';

/**
 * Selects the result of the current battle.
 * @param {Object} state The global state
 * @returns {Object} A result object
 */
const getBattleResult = (state) => {
    const { groups, characters } = getCurrentBattle(state);

    let result = {
        ...resultDefaults,
        groupIds: groups.map(({ groupId }) => groupId),
        characterIds: characters.map(({ characterId }) => characterId),
    };

    // map whether or not agroup has remaining characters in battle
    const groupStates = groups.map((grpEntry) => (
        !!characters.find(charEntry => charEntry.groupId === grpEntry.groupId)
    ));

    // check if any group does not have remaining characters
    if (groupStates.some(grpState => !grpState)) {
        // determine winner and loser
        result = groupStates.reduce((acc, isAlive, index) => {
            const key = isAlive ? 'winnerGroupId' : 'loserGroupId';
            const { groupId } = groups[index];

            return {
                ...acc,
                [key]: groupId,
            };
        }, result);

        // set additional information
        const loserGroup = getGroupById(state, result.loserGroupId);
        result.victory = result.winnerGroupId === getPlayerGroup(state).id;
        result.lootInventoryId = loserGroup.inventoryId;
        result.expGains = getExpGainForGroup(state, result.winnerGroupId, result.loserGroupId);
    }

    return result;
};

export default getBattleResult;
