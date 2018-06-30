import range from 'lodash/range';
import createStore from '../../store';
import {
    getCharacterById,
    createCharacter,
    spendAPAction,
} from '../characters';
import { groupCreated$ } from './streams';
import {
    getGroupById,
    createGroup,
    addCharacter,
    removeCharacter,
    getGroupAP,
    getGroupsSettings,
    getGroupAPMax,
    hasGroupEnoughAP,
    setActionQueueAction,
    removeFromActionQueueAction,
} from './';


describe('modules/groups', () => {
    let dispatch;
    let getState;
    let group;
    let settings;
    const groupId = 'test-group';
    const groupProps = {
        id: groupId,
        name: 'Test Group',
        coord: [1, 2],
    };

    beforeEach(() => {
        const store = createStore();
        getState = store.getState;
        dispatch = store.dispatch;
        settings = getGroupsSettings(getState());
    });

    describe('Given a new group gets created', () => {
        let mockSubscriber;

        beforeEach(() => {
            mockSubscriber = jest.fn();
            groupCreated$.subscribe(mockSubscriber);

            dispatch(createGroup(groupProps));
            group = getGroupById(getState(), groupId);
        });

        it('should be contained in the groups state', () => {
            expect(group.id).toBe(groupId);
        });

        it('should have custom props if passed', () => {
            Object.keys(groupProps).forEach((prop) => {
                expect(group[prop]).toEqual(groupProps[prop]);
            });
        });

        it('should call subscribers of the create$ stream', () => {
            expect(mockSubscriber).toBeCalled();
        });

        it('should contain no characters', () => {
            expect(group.characterIds.length).toBe(0);
        });

        describe('Given a character gets added to the group', () => {
            let characterIds;
            let character;

            beforeEach(() => {
                characterIds = range(settings.maxCharactersInGroup + 1).map((i) => `char-${i}`);

                dispatch(createCharacter({ id: characterIds[0] }));
                dispatch(addCharacter(groupId, characterIds[0]));

                group = getGroupById(getState(), groupId);
                character = getCharacterById(getState(), characterIds[0]);
            });

            it('should contain 1 character', () => {
                expect(group.characterIds.length).toBe(1);
                expect(group.characterIds[0]).toBe(characterIds[0]);
            });

            it('should contain character w/ related groupId', () => {
                expect(character.groupId).toBe(groupId);
            });

            describe('Given the same character gets added again', () => {
                beforeEach(() => {
                    console = { warn: jest.fn() };

                    dispatch(addCharacter(groupId, characterIds[0]));
                    group = getGroupById(getState(), groupId);
                });

                it('should give a warning', () => {
                    expect(console.warn).toBeCalled();
                });

                it('should eventually not be added', () => {
                    expect(group.characterIds.length).toBe(1);
                    expect(group.characterIds[0]).toBe(characterIds[0]);
                });
            });

            describe('Given more characters than allowed get added to the group', () => {
                beforeEach(() => {
                    console = { warn: jest.fn() };

                    characterIds.slice(1).forEach((charId) => {
                        dispatch(createCharacter({ id: charId }));
                        dispatch(addCharacter(groupId, charId));
                    });
                    group = getGroupById(getState(), groupId);
                });

                it('should give a warning', () => {
                    expect(console.warn).toBeCalled();
                });

                it('should contain no more characters than max allowed', () => {
                    expect(group.characterIds.length).toBe(settings.maxCharactersInGroup);
                });
            });

            describe('Given a character gets removed from the group', () => {
                beforeEach(() => {
                    dispatch(removeCharacter(groupId, characterIds[0]));
                    group = getGroupById(getState(), groupId);
                    character = getCharacterById(getState(), characterIds[0]);
                });

                it('should contain 0 characters', () => {
                    expect(group.characterIds.length).toBe(0);
                });

                it('should remove related groupId from character', () => {
                    expect(character.groupId).toBe(null);
                });
            });
        });

        describe('Given a group w/ mixed characters exists', () => {
            const lowEnd = 6;
            const midEnd = 9;
            const highEnd = 12;
            const lowCharId = 'char-2';
            let lowCharacter;

            beforeEach(() => {
                dispatch(createCharacter({ id: 'char-1', base: { end: highEnd } }));
                dispatch(createCharacter({ id: lowCharId, base: { end: lowEnd } }));
                dispatch(createCharacter({ id: 'char-3', base: { end: midEnd } }));
                dispatch(addCharacter(groupId, 'char-1'));
                dispatch(addCharacter(groupId, lowCharId));
                dispatch(addCharacter(groupId, 'char-3'));
                group = getGroupById(getState(), groupId);
                lowCharacter = getCharacterById(getState(), lowCharId);
            });

            it('should calculate the correct amount of MAX available action points', () => {
                const { computed: { APMax } } = lowCharacter;
                expect(getGroupAPMax(getState(), groupId)).toBe(APMax);
            });

            describe('Given a cheap action gets added to the queue', () => {
                const sampleAction = {
                    type: 'TEST_GROUP_ACTION',
                    playload: {},
                    meta: { isGroupCommand: true },
                };
                const sampleCost = 1;

                beforeEach(() => {
                    dispatch(setActionQueueAction(groupId, [sampleAction]));
                    group = getGroupById(getState(), groupId);
                });

                it('should contain 1 action in the queue', () => {
                    expect(group.actionQueue.length).toBe(1);
                });

                it('should have enough action points to perform the action', () => {
                    expect(
                        hasGroupEnoughAP(getState(), groupId, sampleCost)
                    ).toBe(true);
                });

                describe('Given the action gets performed', () => {
                    beforeEach(() => {
                        dispatch(spendAPAction(
                            group.characterIds,
                            sampleCost
                        ));
                        dispatch(removeFromActionQueueAction(groupId));
                        group = getGroupById(getState(), groupId);
                        lowCharacter = getCharacterById(getState(), lowCharId);
                    });

                    it('should have an empty action queue', () => {
                        expect(group.actionQueue.length).toBe(0);
                    });

                    it('should calculate the correct amount of REMAINING action points', () => {
                        const { computed: { AP } } = lowCharacter;
                        expect(getGroupAP(getState(), groupId)).toBe(AP);
                    });
                });
            });
        });
    });
});
