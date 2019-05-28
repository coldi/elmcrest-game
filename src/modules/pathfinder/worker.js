/* eslint-disable no-undef */
import calcPath from './utils/calcPath';

onmessage = e => {
    // cast object to array
    const params = typeof e.data === 'object' ? Object.values(e.data) : e.data;

    const [state, options] = params;

    // prevent devtools from executing this script with invalid data
    if (typeof state === 'object' && options) {
        options.callback = postMessage;
        calcPath(state, options);
    }
};
