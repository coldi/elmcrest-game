function script() {
    return {
        events: {
            wilderness: {
                title: 'The wilderness',
                // scenes
                START: 'You discover a calm place in the wilds.',
                GATHERED: 'You found something.',
                // shared actions
                GATHER_WATER: 'Gather water. [{AP}AP]',
                GATHER_FOOD: 'Gather food. [{AP}AP]',
                GATHER_WOOD: 'Gather wood. [{AP}AP]',
                LEAVE: 'Leave.',
            },
        },
    };
}
