import subscribeToModules from '../../subscribers';
import createStore from '../../store';
import { incrementTurnAction } from '../cycle';
import { createGroup, addCharacter } from '../groups';
import { getItemTypeById, createItemTypesAction } from '../items';
import { itemTypeDefaults } from '../items/definitions';
import { addItem, equipStack } from '../inventories';
import characterSubscriptions from './subscriptions';
import { levelUp$ } from './streams';
import {
    getCharacterById,
    consumeItem,
    createCharacter,
    addEffects,
    getCharacterEffectsById,
    addExpAction,
    getExpByLevel,
} from './';

describe('modules/characters', () => {
    let dispatch;
    let getState;
    let character;
    const charId = 'test-char';
    const charProps = {
        id: charId,
        name: 'Test Char',
        effects: [],
        base: { str: 10 },
        condition: { HPLost: 10 },
    };
    const triggerNextTurn = () => {
        dispatch(incrementTurnAction());
        character = getCharacterById(getState(), charId);
    };
    const containAtLeast = (obj, least) =>
        Object.keys(least).every(key => {
            if (typeof least[key] === 'object') {
                return containAtLeast(obj[key], least[key]);
            }
            return obj[key] === least[key];
        });

    beforeEach(() => {
        subscribeToModules([characterSubscriptions]);

        const store = createStore();
        getState = store.getState;
        dispatch = store.dispatch;
    });

    describe('Given a new character gets created', () => {
        beforeEach(() => {
            dispatch(createCharacter(charProps));

            character = getCharacterById(getState(), charId);
        });

        it('should be contained in the characters state', () => {
            expect(character.id).toBe(charId);
        });

        it('should have custom props if passed', () => {
            expect(containAtLeast(character, charProps)).toBe(true);
        });

        describe('Given a mutator status effect gets added', () => {
            const effectProps = {
                name: '-=condition.HPLost',
                value: charProps.condition.HPLost,
                duration: 1,
            };
            let prevCharacter;

            beforeEach(() => {
                dispatch(addEffects(charId, effectProps));

                prevCharacter = character;
                character = getCharacterById(getState(), charId);
            });

            it('should contain 1 effect', () => {
                expect(character.effects.length).toBe(1);
            });

            it('should have the correct effect props', () => {
                const effect = character.effects[0];

                Object.keys(effectProps).forEach(prop => {
                    expect(effect[prop]).toEqual(effectProps[prop]);
                });
            });

            it('should NOT have modified character stats', () => {
                Object.keys(charProps).forEach(prop => {
                    if (prop !== 'effects') {
                        expect(character[prop]).toEqual(prevCharacter[prop]);
                    }
                });
            });

            describe('Given the next turn gets triggerd', () => {
                beforeEach(triggerNextTurn);

                it('should have modified character stats', () => {
                    const { HPLost } = character.condition;
                    const restored = prevCharacter.condition.HPLost - effectProps.value;

                    expect(HPLost).toBe(restored);
                });

                describe('Given one more turn gets triggerd', () => {
                    beforeEach(triggerNextTurn);

                    it('should remove expired effects', () => {
                        expect(character.effects.length).toBe(0);
                    });
                });
            });
        });

        describe('Given a modifier status effect gets added', () => {
            const effectProps = {
                name: '+base.str',
                value: 1,
                duration: 1,
            };

            beforeEach(() => {
                dispatch(addEffects(charId, effectProps));

                character = getCharacterById(getState(), charId);
            });

            it('should contain 1 effect', () => {
                expect(character.effects.length).toBe(1);
            });

            it('should have modified character stats', () => {
                const { base } = character;
                const increased = charProps.base.str + effectProps.value;

                expect(base.str).toBe(increased);
            });
        });

        describe('Given the character consumes an item', () => {
            const consumableItemId = 'test-consumable';

            beforeEach(() => {
                dispatch(
                    createItemTypesAction([
                        {
                            ...itemTypeDefaults,
                            id: consumableItemId,
                            consumable: true,
                            effects: [
                                {
                                    name: 'restoreAP',
                                    value: 1,
                                    duration: 0,
                                },
                            ],
                        },
                    ])
                );

                dispatch(consumeItem(charId, { itemTypeId: consumableItemId }));

                character = getCharacterById(getState(), charId);
            });

            it('should have changed character stats', () => {
                expect(character).not.toEqual(charProps);
            });
        });

        describe('Given the character has access to an inventory', () => {
            let group;

            beforeEach(() => {
                group = dispatch(createGroup());
                dispatch(addCharacter(group.id, charId));

                character = getCharacterById(getState(), charId);
            });

            describe('Given the character equips an item stack', () => {
                const wearableItemId = 'test-wearable';
                let item;
                let stack;

                beforeEach(() => {
                    dispatch(
                        createItemTypesAction([
                            {
                                ...itemTypeDefaults,
                                id: wearableItemId,
                                slot: 'head',
                                size: 1,
                                effects: [
                                    {
                                        name: '+computed.APMax',
                                        value: 1,
                                        duration: null,
                                    },
                                ],
                            },
                        ])
                    );

                    item = getItemTypeById(getState(), wearableItemId);

                    stack = dispatch(addItem(group.inventoryId, wearableItemId));
                    dispatch(equipStack(group.inventoryId, stack.id, charId));

                    character = getCharacterById(getState(), charId);
                });

                it('should have the item stack equipped', () => {
                    const equipSlot = character.equip[item.slot];

                    expect(equipSlot.stackId).toBe(stack.id);
                });

                it('should have active status effects according to equipped item', () => {
                    const effects = getCharacterEffectsById(getState(), charId);

                    expect(effects.length).toBe(item.effects.length);

                    effects.forEach((effect, index) => {
                        expect(effect).toMatchObject(item.effects[index]);
                    });
                });
            });
        });

        describe('Given the character receives exp', () => {
            let halfLevelExp;
            let mockSubscriber;
            let subscription;

            beforeEach(() => {
                halfLevelExp = getExpByLevel(getState(), 2) / 2;
                dispatch(addExpAction(charId, halfLevelExp));

                character = getCharacterById(getState(), charId);
            });

            it('should have increased exp', () => {
                expect(character.progress.exp).toBe(halfLevelExp);
            });

            it('should stay on level 1', () => {
                expect(character.computed.level).toBe(1);
            });

            describe('Given the character receives enough exp for one level', () => {
                beforeEach(() => {
                    mockSubscriber = jest.fn();
                    subscription = levelUp$.subscribe(mockSubscriber);

                    dispatch(addExpAction(charId, halfLevelExp));

                    character = getCharacterById(getState(), charId);
                });

                it('should reach the next level', () => {
                    expect(character.computed.level).toBe(2);
                });

                it('should call subscribers of the levelUp$ stream', () => {
                    expect(mockSubscriber).toBeCalled();
                });

                afterEach(() => subscription.unsubscribe());
            });

            describe('Given the character receives enough exp for 3 levels', () => {
                beforeEach(() => {
                    mockSubscriber = jest.fn();
                    subscription = levelUp$.subscribe(mockSubscriber);

                    const manyExp = getExpByLevel(getState(), 4);
                    dispatch(addExpAction(charId, manyExp));

                    character = getCharacterById(getState(), charId);
                });

                it('should reach level 4', () => {
                    expect(character.computed.level).toBe(4);
                });

                it('should call subscribers of the levelUp$ stream only once', () => {
                    expect(mockSubscriber.mock.calls.length).toBe(1);
                });

                afterEach(() => subscription.unsubscribe());
            });
        });
    });
});
