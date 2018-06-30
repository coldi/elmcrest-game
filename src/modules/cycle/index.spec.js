/* eslint-disable  import/no-extraneous-dependencies */
/* eslint-disable  no-undef, no-console, no-global-assign */
import createStore from '../../store';
import {
    phase$,
    playerPhase$,
    computePhase$,
    turn$,
} from './streams';
import {
    PLAYER_PHASE_INDEX,
    COMPUTE_PHASE_INDEX
} from './constants';
import {
    getCycleState,
    getPhaseIndex,
    nextPhase,
} from './';


describe('modules/cycle', () => {
    let store;
    let getState;
    let cycle;

    global.requestIdleCallback = setTimeout;

    beforeEach(() => {
        store = createStore();
        getState = store.getState;
        cycle = getCycleState(getState()).cycle;
    });

    it('should start in turn 0', () => {
        expect(cycle.turn).toBe(0);
    });

    it('should start with the player phase', () => {
        expect(getPhaseIndex(getState())).toBe(PLAYER_PHASE_INDEX);
    });

    describe('Given a new phase gets triggered', () => {
        let prevPhaseIndex;
        let mockPhaseSubscriber;
        let mockComputePhaseSubscriber;

        beforeEach(() => {
            mockPhaseSubscriber = jest.fn();
            phase$.subscribe(mockPhaseSubscriber);

            mockComputePhaseSubscriber = jest.fn();
            computePhase$.subscribe(mockComputePhaseSubscriber);

            prevPhaseIndex = cycle.phaseIndex;

            store.dispatch(nextPhase());
            cycle = getCycleState(getState()).cycle;
        });

        it('should increment phaseIndex', () => {
            expect(getPhaseIndex(getState())).toBe(prevPhaseIndex + 1);
        });

        it('should proceed with the compute phase', () => {
            expect(getPhaseIndex(getState())).toBe(COMPUTE_PHASE_INDEX);
        });

        it('should call subscribers of the phase$ stream', () => {
            expect(mockPhaseSubscriber).toBeCalled();
        });

        it('should call subscribers of the computePhase$ stream', () => {
            expect(mockPhaseSubscriber).toBeCalled();
        });

        describe('Given a new phase gets triggered one more time', () => {
            let prevTurn;
            let mockPlayerPhaseSubscriber;
            let mockTurnSubscriber;

            beforeEach(() => {
                mockTurnSubscriber = jest.fn();
                turn$.subscribe(mockTurnSubscriber);

                mockPlayerPhaseSubscriber = jest.fn();
                playerPhase$.subscribe(mockPlayerPhaseSubscriber);

                prevTurn = cycle.turn;

                store.dispatch(nextPhase());
                cycle = getCycleState(getState()).cycle;
            });

            it('should trigger a new turn', () => {
                expect(cycle.turn).toBe(prevTurn + 1);
            });

            it('should call subscribers of the turn$ stream', () => {
                expect(mockTurnSubscriber).toBeCalled();
            });

            it('should reset phaseIndex', () => {
                expect(getPhaseIndex(getState())).toBe(0);
            });

            it('should restart with the player phase', () => {
                expect(getPhaseIndex(getState())).toBe(PLAYER_PHASE_INDEX);
            });

            it('should call subscribers of the playerPhase$ stream', () => {
                expect(mockPlayerPhaseSubscriber).toBeCalled();
            });
        });
    });
});
