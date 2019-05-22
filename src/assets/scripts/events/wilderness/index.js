function script({
    dispatch,
    getState,
    endEvent,
    gotoScene,
    setEventState,
    getEventState,
    modules,
}) {
    // get api
    const { getCell } = modules.hex;
    const { spendAPAction } = modules.characters;
    const { getCachedFieldByCoord } = modules.world;
    const { addItem } = modules.inventories;
    const { getPlayerGroup, getGroupAP } = modules.groups;

    // define prerequisites
    const state = getState();
    const group = getPlayerGroup(state);
    const fieldsInRange = getCell(group.coord)
        .rangeNeighbors(1)
        .map(cell => cell.toArray2D())
        .map(coord => getCachedFieldByCoord(state, coord));
    const hasWater = fieldsInRange.some(
        field => field.elevation === 0 && field.climate !== 3
    );
    const hasFood = fieldsInRange.some(
        field => field.elevation <= 2 && [1, 2].includes(field.climate)
    );
    const hasWood = fieldsInRange.some(
        field => [2, 3].includes(field.elevation) && [0, 2].includes(field.climate)
    );

    if (!getEventState()) {
        setEventState({ hasWater, hasFood, hasWood });
    }

    // add convenient functions
    const spendAP = amount => dispatch(spendAPAction(group.characterIds, amount));
    const addPlayerItem = (itemTypeId, amount) => {
        dispatch(addItem(group.inventoryId, itemTypeId, amount));
        setEventState({ item: { itemTypeId }, amount });
    };

    const getDefaultScene = () => {
        const AP = getGroupAP(getState(), group.id);
        const requiredAP = 1;
        const itemAmount = 1 + Math.ceil(Math.random() * 3);
        const eventState = getEventState();
        const keepEventOnExit =
            eventState.hasWater || eventState.hasFood || eventState.hasWood;

        return {
            stacks: eventState.item ? [eventState] : null,
            actions: [
                {
                    id: 'GATHER_WATER',
                    params: { AP: requiredAP },
                    visible: eventState.hasWater,
                    condition: AP >= requiredAP,
                    resolve: () => {
                        spendAP(requiredAP);
                        addPlayerItem('bottle-water', itemAmount);
                        setEventState({ hasWater: false });
                        gotoScene('GATHERED');
                    },
                },
                {
                    id: 'GATHER_FOOD',
                    params: { AP: requiredAP },
                    visible: eventState.hasFood,
                    condition: AP >= requiredAP,
                    resolve: () => {
                        spendAP(requiredAP);
                        addPlayerItem('long-lasting-apple', itemAmount);
                        setEventState({ hasFood: false });
                        gotoScene('GATHERED');
                    },
                },
                {
                    id: 'GATHER_WOOD',
                    params: { AP: requiredAP },
                    visible: eventState.hasWood,
                    condition: AP >= requiredAP,
                    resolve: () => {
                        spendAP(requiredAP);
                        addPlayerItem('wood', itemAmount);
                        setEventState({ hasWood: false });
                        gotoScene('GATHERED');
                    },
                },
                {
                    id: 'LEAVE',
                    resolve: () => {
                        setEventState({ item: null });
                        endEvent(keepEventOnExit);
                    },
                },
            ],
        };
    };

    return {
        id: 'wilderness',
        scenes: {
            START: getDefaultScene,
            GATHERED: getDefaultScene,
        },
    };
}
