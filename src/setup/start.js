import { getCharactersSettings, createCharacter } from '../modules/characters';
import { getGroupsSettings, createGroup, addCharacter, getPlayerGroup } from '../modules/groups';
import { addItem } from '../modules/inventories';
import { getItemTypesList } from '../modules/items';
import { createRandomGroup } from '../modules/gamemaster';
import { updateWeather } from '../modules/world';

/**
 * Set up initial game environment.
 */
export default function start (dispatch, getState) {
    const { playerGroupId } = getGroupsSettings(getState());
    const { playerId } = getCharactersSettings(getState());
    const progress = {
        basePoints: 3,
        skillPoints: 4,
    };

    // set up player group
    dispatch(createGroup({ id: playerGroupId }));
    dispatch(createCharacter({
        id: playerId,
        name: 'Ewan',
        resourceId: 'player',
        // base: { str: 16, int: 13, end: 9 },
        progress,
        skills: {
            attack: 1,
        }
    }));
    dispatch(createCharacter({
        id: 'companion',
        name: 'Brix',
        resourceId: 'brix',
        // base: { str: 16, dex: 11, end: 13 },
        progress,
        skills: {
            attack: 1,
        }
    }));
    dispatch(addCharacter(playerGroupId, playerId));
    dispatch(addCharacter(playerGroupId, 'companion'));

    // add every existing item 1x to player's inventory
    const state = getState();
    const itemTypes = getItemTypesList(state);
    const { inventoryId } = getPlayerGroup(state);

    itemTypes.forEach((type) => {
        dispatch(addItem(inventoryId, type.id));
    });

    // set up npc groups
    Array.from({ length: 2 }).forEach((_, i) => {
        dispatch(createRandomGroup({
            coord: [1, -1 + i],
            numCharacters: (i * 2) + 1,
            level: 1,
        }));
    });

    // update weather
    dispatch(updateWeather(true));
}
