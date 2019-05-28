import invariant from './invariant';

const { NODE_ENV } = process.env;

const makeLog = method => (...args) => {
    if (NODE_ENV === 'production') {
        return;
    }

    invariant(method in console, `Log method '${method}' does not exist.`);

    // eslint-disable-next-line  no-console
    console[method](...args);
};

const log = makeLog('log');
log.warn = makeLog('warn');
log.info = makeLog('info');
log.error = makeLog('error');

export default log;
