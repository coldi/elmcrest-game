import invariant from 'modules/utils/invariant';
import {
    getGroupsSettings,
    getPlayerGroup,
    getPlayerGroupCharacters,
    createGroup,
    addCharacter,
} from 'modules/groups';
import { getCharactersSettings, createCharacter } from 'modules/characters';
import { getStackOfItem } from 'modules/inventories';
import { currentEventDefaults } from 'modules/events/definitions';
import {
    INITIAL_SCENE_ID,
    getCurrentEvent,
    getHistoryEventById,
    initEventApi,
    setCurrentEventAction,
} from 'modules/events';
import createStore from '../../../store';
import eventScript from './';

const runActionSequence = (getState, script, sequence) => {
    sequence.forEach(index => {
        const [latestScene] = getCurrentEvent(getState()).scenes.slice(-1);
        const scene = script.scenes[latestScene]();
        const action = scene.actions[index];

        invariant(
            action.condition !== false,
            `Action ${index} in ${sequence} does not meet condition.`
        );

        action.resolve();
    });
};

describe('scripts/events/test', () => {
    const eventId = 'test';
    const rewardItemId = 'test-reward';
    let dispatch;
    let getState;
    let eventApi;
    let currentEvent;
    let script;
    let group;

    beforeEach(async () => {
        const store = createStore();
        getState = store.getState;
        dispatch = store.dispatch;

        const { playerGroupId } = getGroupsSettings(getState());
        const { playerId } = getCharactersSettings(getState());

        // set up player group
        dispatch(createGroup({ id: playerGroupId }));
        dispatch(createCharacter({ id: playerId, base: { dex: 9 } }));
        dispatch(createCharacter({ id: 'companion', base: { dex: 11 } }));
        dispatch(addCharacter(playerGroupId, playerId));
        dispatch(addCharacter(playerGroupId, 'companion'));

        group = getPlayerGroup(getState());
    });

    describe('Given the event gets started', () => {
        beforeEach(() => {
            dispatch(
                setCurrentEventAction({
                    ...currentEventDefaults,
                    id: eventId,
                })
            );

            currentEvent = getCurrentEvent(getState());

            eventApi = dispatch(initEventApi());
            script = eventScript(eventApi);
        });

        it('should have current event with expected id', () => {
            expect(currentEvent.id).toBe(eventId);
        });

        it('should use script with the expected id', () => {
            expect(script.id).toBe(eventId);
        });

        it('should have script with proper initial scene', () => {
            expect(typeof script.scenes[INITIAL_SCENE_ID] === 'function').toBe(true);
        });

        it('should have current event with initial scene', () => {
            expect(currentEvent.scenes).toContain(INITIAL_SCENE_ID);
        });

        describe.skip('Test actions in sequence', () => {
            describe('Given the actions are selected in sequence: [0, 0, 0]', () => {
                beforeEach(() => {
                    runActionSequence(getState, script, [0, 0, 0]);
                });

                it.skip('should end the current event', () => {
                    expect(getCurrentEvent(getState())).toBe(null);
                });

                it('should archive the event in history', () => {
                    expect(getHistoryEventById(getState(), eventId)).toBeTruthy();
                });

                it('should have lost AP', () => {
                    const characters = getPlayerGroupCharacters(getState());
                    characters.forEach(char => {
                        expect(char.condition.APUsed).toBeGreaterThan(0);
                    });
                });

                it('should have NOT received the reward', () => {
                    const { inventoryId } = group;
                    expect(
                        getStackOfItem(getState(), inventoryId, {
                            itemTypeId: rewardItemId,
                        })
                    ).toBeFalsy();
                });
            });

            describe('Given the actions are selected in sequence: [0, 1, 0]', () => {
                beforeEach(() => {
                    runActionSequence(getState, script, [0, 1, 0]);
                });

                it('should end the current event', () => {
                    expect(getCurrentEvent(getState())).toBe(null);
                });

                it('should archive the event in history', () => {
                    expect(getHistoryEventById(getState(), eventId)).toBeTruthy();
                });

                it('should have received the reward', () => {
                    const { inventoryId } = group;
                    expect(
                        getStackOfItem(getState(), inventoryId, {
                            itemTypeId: rewardItemId,
                        })
                    ).toBeTruthy();
                });
            });
        });
    });
});
