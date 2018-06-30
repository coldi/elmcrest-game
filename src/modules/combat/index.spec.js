import sortBy from 'lodash/sortBy';
import createStore from '../../store';
import { getCharacterById, createCharacter } from '../characters';
import { createGroup, addCharacter } from '../groups';
import { skillDefaults } from '../skills/definitions';
import { getSkillById, registerSkill } from '../skills';
import isBattleActive from './selectors/isBattleActive';
import getCurrentBattle from './selectors/getCurrentBattle';
import getCombatUIState from './selectors/getCombatUIState';
import getQueuedEntries from './selectors/getQueuedEntries';
import startBattle from './actions/startBattle';
import performSelection from './actions/performSelection';
import applyRollout from './actions/applyRollout';
import removeRollout from './actions/removeRollout';

// mock simple skill script
jest.mock('../skills/selectors/getSkillScriptById', () => (
    () => ({ origin, target }) => [{
        originId: origin.id,
        targetId: target.id,
        effects: [{ name: '+=condition.HPLost', value: 1 }],
    }])
);

describe('modules/combat', () => {
    let getState;
    let dispatch;

    let currentBattle;
    let queue;
    let uiState;

    let themChars;
    let themGroups;

    beforeEach(() => {
        const store = createStore();
        getState = store.getState;
        dispatch = store.dispatch;

        dispatch(registerSkill({
            ...skillDefaults,
            id: 'attack',
            baseValue: 100,
            cost: 50,
        }));

        themChars = [
            { id: 'char1', base: { end: 10 } },
            { id: 'char2', base: { end: 8 } },
            { id: 'char3', base: { end: 16 } },
            { id: 'char4', base: { end: 12 } },
        ];
        themGroups = [
            { id: 'grp1', charIds: themChars.slice(0, 2).map(char => char.id) },
            { id: 'grp2', charIds: themChars.slice(2, 4).map(char => char.id) },
        ];

        themChars.forEach(char => dispatch(createCharacter(char)));
        themGroups.forEach(grp => {
            dispatch(createGroup({ id: grp.id }));
            grp.charIds.forEach(charId => dispatch(addCharacter(grp.id, charId)));
        });
    });

    describe('Given a battle gets started', () => {
        beforeEach(() => {
            const [grp1, grp2] = themGroups;

            dispatch(startBattle(grp1.id, grp2.id, grp2.id));

            currentBattle = getCurrentBattle(getState());
            queue = getQueuedEntries(getState());
            uiState = getCombatUIState(getState());
        });

        it('should be considered as active', () => {
            expect(isBattleActive(getState())).toBe(true);
        });

        it('should contain the correct group entries', () => {
            const { groups } = currentBattle;

            expect(
                themGroups.every(grp => groups.find(entry => entry.groupId === grp.id))
            ).toBe(true);
        });

        it('should contain the correct character entries', () => {
            const { characters } = currentBattle;

            expect(
                themChars.every(char => characters.find(entry => entry.characterId === char.id))
            ).toBe(true);
        });

        it('should start with the character with the lowest initial delay', () => {
            const [firstEntry] = queue;
            const [expectedFirstChar] = sortBy(themChars, char => char.base.end).reverse();

            expect(firstEntry.characterId).toBe(expectedFirstChar.id);
        });

        describe('Given the initial character performs a selection', () => {
            let skillId;
            let skill;
            let characterId;
            let skillResult;
            let rolloutEntry;

            beforeEach(async () => {
                skillId = 'attack';
                characterId = themGroups[0].charIds[0];

                await dispatch(
                    performSelection({
                        skillId,
                        characterId,
                    })
                );

                uiState = getCombatUIState(getState());
                skill = getSkillById(getState(), skillId);
                rolloutEntry = uiState.rollouts[0];
                skillResult = rolloutEntry.result;
            });

            it('should add a proper rollout entry', () => {
                expect(uiState.rollouts).toHaveLength(1);

                expect(rolloutEntry.skillId).toBe(skillId);
                expect(rolloutEntry.originId).toBe(queue[0].characterId);
                expect(rolloutEntry.targetId).toBe(characterId);
            });

            it('should get a proper skill result for current rollout entry', () => {
                expect(skillResult).toHaveLength(1);
            });

            describe('Given the rollout entry gets applied', () => {
                let prevCharStats;
                let charStats;

                beforeEach(async () => {
                    prevCharStats = getCharacterById(getState(), rolloutEntry.targetId);

                    await dispatch(applyRollout());

                    charStats = getCharacterById(getState(), rolloutEntry.targetId);
                });

                it('should modify the target in some way', () => {
                    expect(charStats).not.toEqual(prevCharStats);
                });

                it('should decrease target\'s HP', () => {
                    expect(charStats.computed.HP).toBeLessThan(prevCharStats.computed.HP);
                });
            });

            describe('Given the rollout gets removed', () => {
                let prevActiveCharEntry;
                let nextActiveCharEntry;
                let activeCharEntry;

                beforeEach(() => {
                    prevActiveCharEntry = getQueuedEntries(getState())[0];
                    nextActiveCharEntry = getQueuedEntries(getState())[1];

                    dispatch(removeRollout());

                    currentBattle = getCurrentBattle(getState());
                    queue = getQueuedEntries(getState());
                    uiState = getCombatUIState(getState());

                    activeCharEntry = queue[0];
                });

                it('should remove the current rollout entry', () => {
                    expect(uiState.rollouts).toHaveLength(0);
                });

                it('should update character battle queue', () => {
                    expect(activeCharEntry.characterId).toBe(nextActiveCharEntry.characterId);
                });

                it('should update character delays', () => {
                    const charEntry = queue.find(
                        entry => entry.characterId === prevActiveCharEntry.characterId
                    );
                    const updatedDelay = (prevActiveCharEntry.delay + skill.cost)
                        - nextActiveCharEntry.delay;

                    expect(charEntry.delay).toBe(updatedDelay);
                });
            });

            describe('Given player characters are skipped and now NPC is about to perform', () => {
                const nextCallStack = () => new Promise(resolve => setTimeout(resolve));
                let activeCharEntry;

                beforeEach(async () => {
                    // remove current rollout
                    dispatch(removeRollout());

                    uiState = getCombatUIState(getState());
                    queue = getQueuedEntries(getState());
                    activeCharEntry = queue[0];

                    /* eslint-disable  no-await-in-loop */
                    while (activeCharEntry.groupId === uiState.controlledGroupId) {
                        // skip current character

                        await dispatch(
                            // attack self
                            performSelection({
                                skillId: 'attack',
                                characterId: activeCharEntry.characterId,
                            })
                        );

                        // do not apply rollout, but remove it
                        dispatch(removeRollout());

                        await nextCallStack();

                        // get updates
                        uiState = getCombatUIState(getState());
                        queue = getQueuedEntries(getState());
                        activeCharEntry = queue[0];
                    }
                });

                it('should have NPC as active queue entry', () => {
                    expect(activeCharEntry.groupId).not.toBe(uiState.controlledGroupId);
                });

                it('should have automatically created a rollout for NPC', () => {
                    expect(uiState.rollouts).toHaveLength(1);
                    expect(uiState.rollouts[0].originId).toBe(activeCharEntry.characterId);
                });
            });
        });
    });
});
