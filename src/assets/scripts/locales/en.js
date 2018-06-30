function script () {
    return {
        common: {
            attributes: 'Attributes',
            level: 'Level',
            effects: 'Status effects',
            none: 'none',
            itemSize: 'Size',
            wearableItem: 'Wearable',
            consumableItem: 'Consumable',
            cost: 'Cost',
            combatTime: 'Combat time',
            gameOver: 'Game Over',
            gameOverMessage: 'You are dead. Your journey ends...',
            victory: 'Victory!',
        },
        gender: {
            he: 'he',
            she: 'she',
            it: 'it',
            his: 'his',
            her: 'her',
            its: 'its',
            him: 'him',
        },
        char: {
            attr: {
                str: 'Strength',
                dex: 'Dexterity',
                int: 'Intelligence',
                cha: 'Charisma',
                per: 'Perception',
                end: 'Endurance',

                exp: 'EXP',
                expBoost: 'EXP bonus',
                level: 'Level',

                water: 'Water',
                food: 'Food',
                energy: 'Energy',

                HP: 'HP',
                HPMax: 'Max HP',
                AP: 'AP',
                APMax: 'Max AP',
                armor: 'Armor',
                defenseRating: 'Defense',
                hitChance: 'Hit chance',
                critChance: 'Critical hit chance',
                meleeDamage: 'Melee damage',
                rangeDamage: 'Range damage',
            },
            equip: {
                head: 'Head',
                body: 'Body',
                feet: 'Feet',
                trinket: 'Trinket',
                hand: 'Hand',
            }
        },
        qualities: {
            normal: '',
            uncommon: 'High quality',
            special: 'Sublime quality',
            rare: 'Rare artifact',
        },
        items: {
            'test-wearable': {
                name: 'Test Wearable',
                descr: 'Test description.',
            },
            'test-consumable': {
                name: 'Test Consumable',
                descr: 'Test description.',
            },
            'boots': {
                name: 'Boots',
                descr: 'These boots look pretty worn and stink abominably.',
            },
            'hat': {
                name: 'Hat',
                descr: 'An old hat. It barely satisfies current fashion standards.',
            },
            'ring': {
                name: 'Ring',
                descr: '',
            },
            'necklace': {
                name: 'Necklace',
                descr: '',
            },
            'chestplate': {
                name: 'Chestplate',
                descr: 'A body armor for a real hero. Or at least someone who just started his career.',
            },
            'sword': {
                name: 'Sword',
                descr: 'A sharp melee weapon.',
            },
            'axe': {
                name: 'Axe',
                descr: 'A sharp melee weapon.',
            },
            'mace': {
                name: 'Mace',
                descr: 'A blunt melee weapon.',
            },
            'bottle-water': {
                name: 'A bottle of water',
                descr: 'It\'s clean and fresh water.',
            },
            'deer-meat': {
                name: 'Deer meat',
                descr: 'In it\'s raw state it will be almost uneatable.',
            },
            'long-lasting-apple': {
                name: 'Long lasting Apple',
                descr: 'This one looks indeed pretty healthy.',
            },
            'gold': {
                name: 'Gold',
                descr: 'Can buy goodies.',
            },
            'wood': {
                name: 'Wood',
                descr: 'This might be useful for something.',
            },
        },
        affixes: {
            prefixes: {
                str: 'Titan\'s ',
                dex: 'Assassin\'s ',
                int: 'Wizard\'s ',
                meleeDmg: 'Warrior\'s ',
            },
            suffixes: {
                per: ' of the Hawk',
                end: ' of the Oak',
                cha: ' of Charming',
                armor: ' of Shelter',
                expBoost: ' of the Apprentice',
                apMax: ' of Travel',
            },
        },
        effects: {
            restoreAP: {
                name: 'AP Restoration',
                descr: 'Restores {0} AP'
            },
            heal: {
                name: 'Healing',
                descr: 'Heals {0} HP'
            },
            damage: {
                name: 'Damage',
                descr: 'Deals {0} damage'
            },
            water: {
                name: 'Water',
                descr: 'Restores {0}% water'
            },
            food: {
                name: 'Food',
                descr: 'Restores {0}% food'
            },
            energy: {
                name: 'Energy',
                descr: 'Restores {0}% energy'
            },
        },
        rel: { // effect relations
            common: 'Common',
            breakArmor: 'Broken armor',
            encourage: 'Encouraged',
        },
        skills: {
            attack: {
                name: 'Attack',
                descr: 'A basic attack that deals some damage to the target.',
                usage: '**{origin}** attacks **{target}** and deals <dmg>{effect0}</dmg> damage.',
            },
            breakArmor: {
                name: 'Break Armor',
                descr: 'An attack that deals minor damage to the target and decreases it\'s armor.',
                usage: '**{origin}** attacks **{target}**, deals <dmg>{effect0}</dmg> damage and decreases armor by <val>{effect1}</val>.',
            },
            attackAll: {
                name: 'Go wild',
                descr: 'Attacks all members of the target\'s group.',
                usage: '**{origin}** wildly attacks **{target}** and deals <dmg>{effect0}</dmg> damage.',
            },
            heal: {
                name: 'Healing',
                descr: 'Restores some HP of the target.',
                usage: '**{origin}** heals **{target}** by <val>{effect0}</val>.',
            },
            encourage: {
                name: 'Encourage',
                descr: 'Greatly increases strength and armor of all group members.',
                usage: '**{origin}** increases strength of **{target}** by <val>{effect0}</val>.',
            },
            healAll: {
                name: 'Group Healing',
                descr: 'Restores some HP of all group members.',
                usage: '**{origin}** heals **{target}** by <val>{effect0}</val>.',
            },
        },
        combat: {
            battleBegin: '<b>The battle begins!</b>',
            states: {
                dead: '**{target}** is dead.',
            },
        },
        ui: {
            windows: {
                devTool: {
                    name: 'DevTool',
                    title: 'The Mighty DevTool',
                },
                character: {
                    name: 'Character',
                    title: 'Character Details',
                },
                inventory: {
                    name: 'Inventory',
                    title: 'Inventory',
                },
                equipment: {
                    title: 'Equipment & Stats',
                },
                skills: {
                    name: 'Skills',
                    title: 'Skills',
                }
            },
            messages: {
                newTurnBegins: 'A new turn ({turn}) begins.',
                playerPhase: 'It\'s your turn!',
                computePhase: 'Computing the environment ...',
                blockedPath: 'The path at {coord} is blocked.',
                noActionWhenOverloaded: 'Unable to perform action. Your inventory is overloaded.',
                characterDiedInCombat: '',
                gainedExp: 'You receive {exp} experience.',
                pickLoot: 'Choose your loot:',
                levelUp: 'Level up!',
                levelReached: 'You reached level {level}.',
            },
            confirm: 'OK',
            dismiss: 'Cancel',
            done: 'Done',
            reset: 'Reset',
            availBasePoints: `
                {points, plural,
                    =0 {0 points}
                    =1 {1 point}
                    other {{points} points}}
                available
            `,
            availSkillPoints: `
                {points, plural,
                    =0 {0 skill points}
                    =1 {1 skill point}
                    other {{points} skill points}}
                available
            `,
            removeSaveGameConfirmation: 'Remove previously saved game?',
            equipItem: 'Equip',
            consumeItem: 'Consume',
            dropItem: 'Destroy {amount, plural, =1 {} other {(1)}}',
            takeAll: 'Take all',
            nextTurn: 'Next Turn',
            commonActions: 'Actions',
        }
    };
}
