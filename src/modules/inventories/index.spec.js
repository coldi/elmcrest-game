import createStore from '../../store';
import { getItemTypeById, getItemTypesList, createItemTypesAction } from '../items';
import { getCharacterById, createCharacter } from '../characters';
import { createGroup, addCharacter } from '../groups';
import { itemTypeDefaults } from '../items/definitions';
import {
    STATIC_INVENTORY,
    DYNAMIC_INVENTORY,
} from './constants';
import {
    getInventoriesSettings,
    getInventoryById,
    getInventoryOwner,
    getStackById,
    getStacksList,
    getStackSize,
    getStackOfItem,
    getTotalCapacity,
    getHoldCapacity,
    getFreeCapacity,
    createInventory,
    addItem,
    equipStack,
    unequipStack,
    removeItem,
    transferAllStacks,
} from './';


describe('modules/inventories', () => {
    let getState;
    let dispatch;
    let inventory;
    let settings;
    const invId = 'test-inventory';

    beforeEach(() => {
        const store = createStore();
        getState = store.getState;
        dispatch = store.dispatch;
        settings = getInventoriesSettings(getState());
    });

    describe('Given a static inventory gets created', () => {
        beforeEach(() => {
            dispatch(createInventory({ id: invId, type: STATIC_INVENTORY }));
            inventory = getInventoryById(getState(), invId);
        });

        it('should be contained in the inventories state', () => {
            expect(inventory.id).toBe(invId);
        });

        it('should have type static', () => {
            expect(inventory.type).toBe(STATIC_INVENTORY);
        });

        it('should contain no stacks', () => {
            expect(getStacksList(getState(), invId).length).toBe(0);
        });

        describe('Given an item gets added', () => {
            const itemTypeId = 'test-consumable';
            let stackableItemType;
            let stack;
            let stackList;

            beforeEach(() => {
                dispatch(createItemTypesAction([
                    {
                        ...itemTypeDefaults,
                        id: itemTypeId,
                        consumable: true,
                        size: 1,
                    }
                ]));

                stackableItemType = getItemTypesList(getState()).filter(type => !type.slot).shift();
                dispatch(addItem(invId, stackableItemType.id));
                stack = getStackOfItem(getState(), invId, { itemTypeId: stackableItemType.id });
                stackList = getStacksList(getState(), invId);
            });

            it('should contain 1 stack with amount 1', () => {
                expect(stackList.length).toBe(1);
                expect(stack.item.itemTypeId).toBe(stackableItemType.id);
                expect(stack.amount).toBe(1);
            });

            it('should calculate correct capacities', () => {
                const size = getStackSize(getState(), invId, stack.id);
                const totalCapacity = getTotalCapacity(getState(), invId);

                expect(size).toBeGreaterThan(0);
                expect(getHoldCapacity(getState(), invId)).toBe(size);
                expect(getFreeCapacity(getState(), invId)).toBe(totalCapacity - size);
            });

            describe('Given the same item gets added multiple times', () => {
                const amount = 3;

                beforeEach(() => {
                    dispatch(addItem(invId, stackableItemType.id, amount));
                    stack = getStackOfItem(getState(), invId, { itemTypeId: stackableItemType.id });
                    stackList = getStacksList(getState(), invId);
                });

                it('should contain 1 stack with increased amount', () => {
                    expect(stack.amount).toBe(1 + amount);
                    expect(stackList.length).toBe(1);
                });
            });

            describe('Given the previously added item gets removed', () => {
                beforeEach(() => {
                    dispatch(removeItem(invId, { itemTypeId: stackableItemType.id }));
                    stack = getStackOfItem(getState(), invId, { itemTypeId: stackableItemType.id });
                    stackList = getStacksList(getState(), invId);
                });

                it('should not contain a stack of the item', () => {
                    expect(stack).toBe(undefined);
                });

                it('should contain 0 stacks', () => {
                    expect(stackList.length).toBe(0);
                });
            });

            describe('Given the content is transfered to another inventory', () => {
                let otherInventory;

                beforeEach(() => {
                    const char = dispatch(createCharacter());
                    const group = dispatch(createGroup());
                    dispatch(addCharacter(group.id, char.id));

                    otherInventory = getInventoryById(getState(), group.inventoryId);

                    dispatch(transferAllStacks(inventory.id, otherInventory.id));
                });

                it('should remove the item from the original inventory', () => {
                    expect(getStacksList(getState(), inventory.id)).toHaveLength(0);
                });

                it('should add a new stack of the item to the other inventory', () => {
                    const stacks = getStacksList(getState(), otherInventory.id);
                    const [newStack] = stacks;
                    expect(stacks).toHaveLength(1);
                    expect(newStack.id).not.toBe(stack.id);
                    expect(newStack.item.itemTypeId).toBe(stack.item.itemTypeId);
                    expect(newStack.amount).toBe(stack.amount);
                });
            });
        });

        describe('Given a non-existing item gets added', () => {
            let mockAddItem;

            beforeEach(() => {
                mockAddItem = () => dispatch(addItem(invId, 'non-existing-type-id'));
            });

            it('should throw an error', () => {
                expect(mockAddItem).toThrow();
            });
        });
    });

    describe('Given a dynamic group inventory gets created', () => {
        const charId = 'test-char';
        const groupId = 'test-group';
        let owner;

        beforeEach(() => {
            dispatch(createCharacter({ id: charId }));
            const group = dispatch(createGroup({ id: groupId }));
            dispatch(addCharacter(groupId, charId));

            inventory = getInventoryById(getState(), group.inventoryId);
            owner = getInventoryOwner(getState(), inventory.id);
        });

        it('should have type dynamic', () => {
            expect(inventory.type).toBe(DYNAMIC_INVENTORY);
        });

        it('should have a group as owner', () => {
            expect(owner.id).toBe(groupId);
        });

        it('should calculate correct total capacity', () => {
            const capacity = owner.characterIds.length * settings.dynamicCapacity;

            expect(getTotalCapacity(getState(), inventory.id)).toBe(capacity);
        });

        describe('Given an item stack gets equipped to a character', () => {
            const wearableItemTypeId = 'test-wearable';
            let itemType;
            let wearableStack;
            let character;

            beforeEach(() => {
                dispatch(createItemTypesAction([
                    {
                        ...itemTypeDefaults,
                        id: wearableItemTypeId,
                        slot: 'head',
                        size: 1,
                    }
                ]));

                itemType = getItemTypeById(getState(), wearableItemTypeId);
                wearableStack = dispatch(addItem(inventory.id, wearableItemTypeId));
                dispatch(equipStack(inventory.id, wearableStack.id, charId));

                character = getCharacterById(getState(), charId);
                wearableStack = getStackById(getState(), inventory.id, wearableStack.id);
            });

            it('should have character with equipped stack item', () => {
                const { equip } = character;

                expect(equip[itemType.slot]).toMatchObject({
                    stackId: wearableStack.id
                });
            });

            it('should have stack flagged as equipped', () => {
                expect(wearableStack.equipped).toBe(true);
            });

            describe('Given the item stack gets unequipped from a character', () => {
                beforeEach(() => {
                    dispatch(unequipStack(inventory.id, wearableStack.id, charId));

                    character = getCharacterById(getState(), charId);
                    wearableStack = getStackById(getState(), inventory.id, wearableStack.id);
                });

                it('should have character with NO equipped stack item', () => {
                    const { equip } = character;

                    expect(equip[itemType.slot]).toBe(null);
                });

                it('should have stack flagged as NOT equipped', () => {
                    expect(wearableStack.equipped).toBe(false);
                });
            });
        });
    });
});
