import calcCoordsBetweenCorners from './calcCoordsBetweenCorners';

describe('modules/world', () => {
    describe('calcCoordsBetweenCorners', () => {
        it('calculates correct result with 4 given corners', () => {
            const corners = [
                [0, 0],
                [3, 0],
                [3, 3],
                [0, 3],
            ];

            const coords = [
                [0, 0], [2, 0], [1, 0],
                [0, 1], [2, 1], [1, 1],
                [0, 2], [2, 2], [1, 2],
            ];

            const result = calcCoordsBetweenCorners(corners);

            expect(result).toEqual(coords);
        });

        it('calculates correct result with offset', () => {
            const corners = [
                [0, 0],
                [2, 0],
                [2, 2],
                [0, 2],
            ];

            const coords = [
                [0, -1], [2, -1], [-1, -1], [1, -1],
                [0, 0], [2, 0], [-1, 0], [1, 0],
                [0, 1], [2, 1], [-1, 1], [1, 1],
                [0, 2], [2, 2], [-1, 2], [1, 2],
            ];

            const result = calcCoordsBetweenCorners(corners, 1);

            expect(result).toEqual(coords);
        });

        it('calculates correct result with negative corners', () => {
            const corners = [
                [-3, 0],
                [0, 0],
                [0, -1],
                [-3, -1],
            ];

            const coords = [
                [-2, -1], [-3, -1], [-1, -1],
            ];

            const result = calcCoordsBetweenCorners(corners);

            expect(result).toEqual(coords);
        });

        it('throws an error with less than 4 given corners', () => {
            const corners = [
                [0, 0],
                [2, 0],
                [2, 2],
            ];

            const fn = () => calcCoordsBetweenCorners(corners);

            expect(fn).toThrow();
        });
    });
});
