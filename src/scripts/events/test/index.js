export default ({
    dispatch,
    getState,
    endEvent,
    gotoScene,
    setEventState,
    getEventState,
    modules,
}) => {
    // get api
    const { spendAPAction } = modules.characters;
    const { getPlayerGroup, getPlayerGroupCharacters } = modules.groups;
    const { createItemTypesAction } = modules.items;
    const { addItem } = modules.inventories;

    // define prerequisites
    const state = getState();
    const { inventoryId, characterIds } = getPlayerGroup(state);
    const characters = getPlayerGroupCharacters(state);
    // TODO: use helper function for item type defaults
    const itemReward = {
        id: 'test-reward',
        type: 'misc',
        resourceId: 'items/wearable/ring.png',
        consumable: true,
        effects: [],
    };

    dispatch(createItemTypesAction(itemReward));

    // initial event state
    setEventState({
        selectedChar: null,
    });

    const getSelectionParams = () => ({
        name: getEventState().selectedChar.name,
        gender: getEventState().selectedChar.gender,
        otherName: characters.find(char => char.id !== getEventState().selectedChar.id)
            .name,
    });

    return {
        id: 'test',
        scenes: {
            START: () => ({
                /**
                 * You discover some ancient ruins.
                 * Want to investigate?
                 */
                // list of actions
                actions: [
                    {
                        id: 'INVESTIGATE',
                        // optional action condition
                        condition: true,
                        resolve: () => gotoScene('RUINS'),
                    },
                    {
                        id: 'DISMISS_START',
                        resolve: endEvent,
                    },
                ],
            }),
            RUINS: () => ({
                /**
                 * The ruins are almost impassable.
                 * You find a very small entrance.
                 * Who of your group should enter?
                 */
                actions: characters
                    .map(char => ({
                        id: 'ENTER_RUINS',
                        params: { name: char.name },
                        resolve: () => {
                            setEventState({
                                selectedChar: char,
                            });

                            if (char.base.dex > 10) {
                                gotoScene('INSIDE_RUINS');
                            } else {
                                gotoScene('COLLAPSE');
                            }
                        },
                    }))
                    .concat([
                        {
                            id: 'DISMISS_RUINS',
                            resolve: endEvent,
                        },
                    ]),
            }),
            INSIDE_RUINS: () => ({
                /**
                 * Inside the character finds a powerful artifact.
                 * After the character returns to the group,
                 * everyone is happy and relieved.
                 */
                // show character portrait by specifying resourceId
                resourceId: getEventState().selectedChar.resourceId,
                // show item stacks
                stacks: [
                    {
                        item: { itemTypeId: itemReward.id },
                    },
                ],
                // translation params for scene text
                params: getSelectionParams(),
                actions: [
                    {
                        id: 'END_SUCCESS',
                        resolve: () => {
                            dispatch(addItem(inventoryId, itemReward.id));
                            endEvent();
                        },
                    },
                ],
            }),
            COLLAPSE: () => ({
                /**
                 * The entrance collapses and the character
                 * almost gets burried under collapsing rocks.
                 */
                resourceId: getEventState().selectedChar.resourceId,
                params: getSelectionParams(),
                actions: [
                    {
                        id: 'END_EXHAUSTED',
                        resolve: () => {
                            dispatch(spendAPAction(characterIds, 3));
                            endEvent();
                        },
                    },
                ],
            }),
        },
    };
};
