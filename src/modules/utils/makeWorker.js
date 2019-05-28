import UniversalWorker from './UniversalWorker';

/**
 * Used to keep track of all created workers.
 * @type {Map}
 */
const threadMap = new Map();

/**
 * Calls the first function from a given list of functions.
 * @param {Function[]} queue
 */
const runNext = queue => {
    const [next] = queue;
    if (typeof next === 'function') {
        next();
    }
};

/**
 * A higher order function that creates a worker instance and
 * returns a function that can be used to pass data to the worker.
 * When called the returned function itself returns a Promise that resolves
 * when the worker has finished.
 * If the returned function is called multiple times in a row,
 * the work gets queued and performed sequentially.
 * @param {string} script A script or function context for the worker
 * @returns {Function} A function that passes it's arguments to the worker
 */
const makeWorker = script => {
    // hash worker threads by script
    if (!threadMap.has(script)) {
        threadMap.set(script, {
            worker: new UniversalWorker(script),
            queue: [],
        });
    }

    const { worker, queue } = threadMap.get(script);

    return (...args) =>
        new Promise((resolve, reject) => {
            // enqueue worker tasks and perform them sequentially
            queue.push(() => {
                try {
                    worker.postMessage(args);
                    worker.onmessage = e => {
                        // eslint-disable-line
                        resolve(e.data);
                        // remove current task
                        queue.shift();
                        // perform next task
                        runNext(queue);
                    };
                } catch (err) {
                    reject(err);
                }
            });

            // start with initial task
            if (queue.length === 1) {
                runNext(queue);
            }
        });
};

makeWorker.supported = UniversalWorker.nativeSupport;

export default makeWorker;
