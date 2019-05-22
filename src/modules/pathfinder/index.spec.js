import sum from 'lodash/sum';
import createStore from '../../store';
import createFieldTypesAction from '../world/actions/createFieldTypesAction';
import calcPath from './utils/calcPath';
import findPath from './';

const mockFieldTypes = [
    { climate: 0, elevation: 0, travelCost: 1 },
    { climate: 0, elevation: 1, travelCost: 1 },
    { climate: 0, elevation: 2, travelCost: 1 },
    { climate: 0, elevation: 3, travelCost: 1 },
    { climate: 0, elevation: 4, travelCost: 1 },
    { climate: 1, elevation: 0, travelCost: 1 },
    { climate: 1, elevation: 1, travelCost: 1 },
    { climate: 1, elevation: 2, travelCost: 1 },
    { climate: 1, elevation: 3, travelCost: 1 },
    { climate: 1, elevation: 4, travelCost: 1 },
    { climate: 2, elevation: 0, travelCost: 1 },
    { climate: 2, elevation: 1, travelCost: 1 },
    { climate: 2, elevation: 2, travelCost: 1 },
    { climate: 2, elevation: 3, travelCost: 1 },
    { climate: 2, elevation: 4, travelCost: 1 },
];

/**
 * Measure time in ms between two calls.
 * @param {number} start Returns the difference between now and the given start time
 * @returns {number} Either a start time or a difference to the given starrt time
 */
const clock = start => {
    if (!start) return process.hrtime();
    const end = process.hrtime(start);
    return Number((end[0] * 1000 + end[1] / 1000000).toFixed(2));
};

describe('modules/pathfinder', () => {
    let getState;

    beforeEach(async () => {
        const store = createStore();
        store.dispatch(createFieldTypesAction(mockFieldTypes));
        getState = store.getState;
    });

    it('finds a simple path (using promise)', () => {
        const from = [0, 0];
        const to = [0, 2];
        const result = [[0, 0], [0, 1], [0, 2]];

        return findPath(getState(), {
            fromCoord: from,
            toCoord: to,
        }).then(
            path => {
                expect(path).toHaveLength(result.length);
                expect(path).toEqual(result);
            },
            () => {}
        );
    });

    it('finds a more complex path in a reasonable amount of time', done => {
        const from = [0, 0];
        const to = [-5, 15];
        const minLength = to[1];
        const maxTime = 75; // in ms
        const times = [];
        const numRuns = 3;

        const evaluateTime = () => {
            const averageTime = sum(times) / times.length;

            expect(averageTime).toBeLessThan(maxTime);
            // console.log(`Avergage time: ${averageTime}`);
            done();
        };

        const callback = index => path => {
            expect(path.length).toBeGreaterThanOrEqual(minLength);
            times[index] = clock(times[index]);

            if (index >= numRuns - 1) {
                evaluateTime();
            }
        };

        for (let i = 0; i < numRuns; i += 1) {
            times[i] = clock();
            calcPath(getState(), {
                fromCoord: from,
                toCoord: to,
                callback: callback(i),
            });
        }
    });
});
