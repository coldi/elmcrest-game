import getGroupsSettings from '../../groups/selectors/getGroupsSettings';
import getGroupById from '../../groups/selectors/getGroupById';
import createGroup from '../../groups/actions/createGroup';
import addCharacter from '../../groups/actions/addCharacter';
import getExpByLevel from '../../characters/selectors/getExpByLevel';
import createCharacter from '../../characters/actions/createCharacter';
import addItem from '../../inventories/actions/addItem';
import equipStack from '../../inventories/actions/equipStack';
import getCachedRng from '../../procedural/selectors/getCachedRng';
import getGeneratedItem from '../../items/selectors/getGeneratedItem';

/**
 * Creates a group with random characters.
 * @param {Object} options An object containing at least a coord
 * @returns {Function} A redux thunk
 */
const createRandomGroup = ({
    coord,
    level = 1,
    numCharacters,
}) => (dispatch, getState) => {
    const state = getState();
    // create empty group
    const grp = dispatch(createGroup({ coord }));
    // calc number of characters to create
    const rng = getCachedRng(state);
    const { maxCharactersInGroup } = getGroupsSettings(state);
    const numChars = numCharacters || Math.ceil(rng.random(maxCharactersInGroup));

    Array.from({ length: numChars }).forEach(() => {
        const attrBonus = Math.floor(level / 2);
        // create characters
        const char = dispatch(createCharacter({
            name: 'Spawned NPC',
            resourceId: 'orc',
            base: {
                str: 7 + attrBonus,
                end: 7 + attrBonus,
                dex: 7,
            },
            progress: {
                exp: getExpByLevel(state, level),
            },
        }));
        // add characters to group
        dispatch(addCharacter(grp.id, char.id));
        // add some generic items to group's inventory
        dispatch(addItem(grp.inventoryId, 'gold', 10)); // TODO: avoid static item ids
        // add some equipment
        Object.keys(char.equip).forEach((slot) => {
            const itemLevel = level + Math.round(Math.random() * 3);
            const item = getGeneratedItem(state, { level: itemLevel, slot });
            if (item) {
                const stack = dispatch(addItem(grp.inventoryId, item));
                dispatch(equipStack(grp.inventoryId, stack.id, char.id));
            }
        });
    });

    // return group from updated state
    return getGroupById(getState(), grp.id);
};

export default createRandomGroup;
