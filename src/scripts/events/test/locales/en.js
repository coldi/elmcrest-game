export default function({ helpers }) {
    const { heSheIt, hisHerIts, himHerIt, cap } = helpers;

    return {
        events: {
            test: {
                title: 'Exciting Test Event',
                START: `
You discover some **ancient ruins**.
People say they may hold **precious rewards** and tell stories of long gone civilizations.
Maybe these rumors are worth to investigate the ruins.
`,
                INVESTIGATE: "Sure, I'm here for adventure anyway",
                DISMISS_START: 'No, maybe next time',

                // ==========================================================

                RUINS: `
The ruins are almost impassable.
After some time you find a very small entrance between some rocks.
It seems just about large enough for one person at a time.
You cannot see anything that lays beyond. Only darkness.
`,
                ENTER_RUINS: 'Send {name}',
                DISMISS_RUINS: 'Back off and leave',

                // ==========================================================

                INSIDE_RUINS: `
{name} enters the dungeon.  
It's so dark that ${heSheIt()} can barely see. But after some time ${hisHerIts()} eyes adapt.
Inside {name} finds a powerful artifact.
${heSheIt({ transform: cap })} takes it and returns to {otherName}.
{otherName} is happy that ${heSheIt()} made it back.
`,
                END_SUCCESS: 'Leave the ruins with your reward',

                // ==========================================================

                COLLAPSE: `
{name} tries to move through the small entrance but then the instable
rocks above ${himHerIt()} suddenly collapse. {otherName} reaches out for {name}
and manages to get ${himHerIt()} out there before it's too late.
`,
                END_EXHAUSTED: 'Leave the ruins exhausted but alive',
            },
        },

        items: {
            'test-reward': {
                name: 'Test Reward',
                descr: 'This reward is well deserved but worth nothing.',
            },
        },
    };
}
