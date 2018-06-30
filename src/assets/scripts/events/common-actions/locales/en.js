function script () {
    return {
        events: {
            'common-actions': {
                title: 'Available actions',
                // scenes
                START: 'You take a break and see what you can do.',
                REST: 'Build a place to rest. [{amount}x Wood] (End turn)',
                END_TURN: 'Wait here. (End turn)',
                LEAVE: 'Continue.',
            }
        }
    };
}
