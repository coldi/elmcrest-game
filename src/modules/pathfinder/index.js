import makeWorker from '../utils/makeWorker';

/**
 * The public function that will be called from outside this module.
 * It calls calcPath() and returns a promise.
 * @param {Object} state The same arguments as calcPath()
 * @param {Object} options The same arguments as calcPath()
 * @returns {Promise}
 */
const findPath = (makeWorker.supported) ? (
    makeWorker('./pathfinder.bundle.js')
) : (
    (state, options) => (
        new Promise((callback) => {
            // eslint-disable-next-line
            const calcPath = require('./utils/calcPath').default;

            setTimeout(() => (
                calcPath(state, { ...options, callback })
            ));
        })
    )
);

export default findPath;
