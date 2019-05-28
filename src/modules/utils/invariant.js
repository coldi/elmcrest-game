const { NODE_ENV } = process.env;

/**
 * Asserts state which the program assumes to be true.
 * If condition is falsy an error with the provided message gets thrown.
 * @param {*} condition
 * @param {string} message
 */
export default function(condition, message) {
    if (NODE_ENV !== 'production') {
        if (message === undefined) {
            throw new Error('invariant requires an error message argument');
        }
    }

    if (!condition) {
        let error;
        if (message === undefined) {
            error = new Error(
                'Minified exception occurred; use the non-minified dev environment ' +
                    'for the full error message and additional helpful warnings.'
            );
        } else {
            error = new Error(message);
            error.name = 'Invariant Violation';
        }

        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
    }
}
