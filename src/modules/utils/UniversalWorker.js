import invariant from './invariant';
import log from './log';

/**
 * Wraps a function to be immediately executed for eval(fn) usage.
 * @param {Function} fn
 * @returns {string} The wrapped function
 */
const wrapFunc = fn => `(${fn})();`;

/**
 * The UniversalWorker provides an universal fallback
 * when using web workers with inline functions.
 * Note: External script files are NOT universally supported yet.
 */
export default class UniversalWorker {
    static nativeSupport = !!(window && window.Worker && window.Blob);

    constructor(script) {
        // test environment with worker support
        if (this.constructor.nativeSupport) {
            let content;

            if (typeof script === 'function') {
                // parse inline function body
                content = global.URL.createObjectURL(
                    new global.Blob([wrapFunc(script)], { type: 'text/javascript' })
                );
            } else {
                // use external script
                content = script;
            }

            log.info('[WORKER] init:', script);

            return new Worker(content);
        }

        // test node environment
        if (typeof process === 'object') {
            invariant(
                typeof script === 'function',
                'UniversalWorker: External script files are not supported in this environment.'
            );

            this.content = wrapFunc(script);
        }
    }

    /* eslint-disable */
    postMessage(data) {
        const self = this;

        setTimeout(function() {
            // define proxy to Worker.onmessage
            function onmessage() {}
            // define proxy to Worker.postMessage
            function postMessage(data) {
                self.onmessage({ data });
            }
            // run the inline script
            eval(self.content);
            // pass the data
            onmessage({ data });
        });
    }

    onmessage() {}
    /* eslint-enable */
}
