import log from '../../utils/log';
import { getCell } from '../../hex';
import isCoordWalkable from '../../world/selectors/isCoordWalkable';
import {
    MAX_DISTANCE,
    MIN_SEARCH_RADIUS,
    SEARCH_RADUIS_MULTIPLIER,
    NUM_NEIGHBORS,
    ITERATIONS_PER_CALCULATION,
} from '../constants';
import reconstructPath from './reconstructPath';
import calcHeuristic from './calcHeuristic';
import calcCost from './calcCost';
import includes from './includes';

/**
 * Calculates the path from one coord to another.
 * If a limit of calculations per iteration is reached it continues after a setTimeout.
 * @param {Object} state The global state
 * @param {number[]} options.fromCoord The coord to start from
 * @param {number[]} options.toCoord The coord to go to
 * @param {Function} options.callback The callback that gets invoked when ready
 * @param {Object} options.progress An object that contains the calculated information
 *                                  of a previous call
 * @returns {[number[]]} The resulting path as array of coords
 */
export default function calcPath (
    state,
    {
        fromCoord,
        toCoord,
        callback = () => {},
        progress = {},
    }
) {
    // destructure progress with default initial values
    const {
        fromCell = getCell(fromCoord),
        toCell = getCell(toCoord),
        distance = fromCell.distance(toCell),
        maxSearchRadius = Math.max(
            MIN_SEARCH_RADIUS,
            distance * SEARCH_RADUIS_MULTIPLIER
        ),
        // wraps the callback and returns the result
        callbackWrapper = (result) => {
            callback(result);
            return result;
        },
        closedSet = [],
        openSet = [fromCell],
        cameFrom = {},
        gScore = { [fromCell]: 0 },
        fScore = { [fromCell]: 0 },
    } = progress;

    // check if distance exceeds search radius
    if (distance > MAX_DISTANCE) {
        log.warn(`Pathfinder: Travel distance exceeds maximum: ${distance} > ${MAX_DISTANCE}`);
        return callbackWrapper([]);
    }

    // check if destination is walkable, ignore dynamic entities
    if (!isCoordWalkable(state, toCoord, true)) {
        // otherwise return
        return callbackWrapper([]);
    }

    let iterations = 0;

    while (openSet.length > 0) {
        let bestCell;
        for (let i = 0; i < openSet.length; i += 1) {
            const prev = bestCell;
            const current = openSet[i];

            if (prev !== undefined && fScore[prev] < fScore[current]) {
                bestCell = prev;
            } else {
                bestCell = current;
            }
        }

        if (bestCell.equals(toCell)) {
            const path = reconstructPath(cameFrom, bestCell);
            const result = path.map(cell => cell.toArray2D());
            return callbackWrapper(result);
        }

        openSet.splice(openSet.indexOf(bestCell), 1);
        closedSet.push(bestCell);

        for (let i = 0; i < NUM_NEIGHBORS; i += 1) {
            const neighbor = bestCell.neighbor(i);
            const h = calcHeuristic(neighbor, toCell);

            if (h <= maxSearchRadius) {
                if (!includes(closedSet, neighbor)) {
                    // if current neighbor is our destination
                    const cost = neighbor.equals(toCell)
                        // skip cost calculation in order to travel to occupied destinations
                        ? 1
                        : calcCost(state, bestCell, neighbor);

                    if (cost >= 0) { // only respect positive cost values
                        const tentativeGScore = gScore[bestCell] + cost;
                        let shouldUpdate = false;

                        if (!includes(openSet, neighbor)) {
                            openSet.push(neighbor);
                            shouldUpdate = true;
                        }

                        if (!gScore[neighbor] || tentativeGScore < gScore[neighbor]) {
                            shouldUpdate = true;
                        }

                        if (shouldUpdate) {
                            cameFrom[neighbor] = bestCell;
                            gScore[neighbor] = tentativeGScore;
                            fScore[neighbor] = gScore[neighbor] + h;
                        }
                    }
                }
            }
        }

        iterations += 1;

        if (iterations >= ITERATIONS_PER_CALCULATION) {
            setTimeout(() => calcPath(state, {
                fromCoord,
                toCoord,
                callback,
                progress: {
                    fromCell,
                    toCell,
                    distance,
                    maxSearchRadius,
                    callbackWrapper,
                    closedSet,
                    openSet,
                    cameFrom,
                    gScore,
                    fScore,
                }
            }));
            return null;
        }
    }

    // no path found
    return callbackWrapper([]);
}
