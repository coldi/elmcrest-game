function script ({
    dispatch,
    getState,
    endEvent,
    modules,
}) {
    // get api
    const { getStackOfItem, removeItem } = modules.inventories;
    const { getPlayerGroup, setGroupDoneAction } = modules.groups;
    const { resetAPAction } = modules.characters;
    const { applyEffects } = modules.effects;

    // define prerequisites
    const state = getState();
    const group = getPlayerGroup(state);

    // add convenient functions
    const hasItem = (itemTypeId, amount) => {
        const stack = getStackOfItem(state, group.inventoryId, { itemTypeId });
        return !!stack && stack.amount >= amount;
    };
    const endTurn = () => dispatch(setGroupDoneAction(group.id, true));

    return {
        id: 'common-actions',
        scenes: {
            START: () => {
                const restItem = 'wood';
                const amount = 1;

                return {
                    actions: [
                        {
                            id: 'REST',
                            params: { amount },
                            condition: hasItem(restItem, amount),
                            resolve: () => {
                                dispatch(removeItem(group.inventoryId, { itemTypeId: restItem }, amount));
                                dispatch(resetAPAction(group.characterIds));
                                group.characterIds.forEach(
                                    id => dispatch(applyEffects(id, { name: 'energy', value: 1 }))
                                );
                                endTurn();
                                endEvent();
                            }
                        },
                        {
                            id: 'END_TURN',
                            resolve: () => {
                                endTurn();
                                endEvent();
                            }
                        },
                        {
                            id: 'LEAVE',
                            resolve: () => endEvent(),
                        },
                    ],
                };
            },
        },
    };
}
