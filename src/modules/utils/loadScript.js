const cache = new Map();

/**
 * Loads a script file and returns a function promise.
 * @param {string} file
 * @return {Promise<Function>}
 */
export default function loadScript(file) {
    if (cache.has(file)) return Promise.resolve(cache.get(file));

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = () => {
            const fn = global.script;
            global.script = undefined;
            script.parentNode.removeChild(script);
            cache.set(file, fn);
            resolve(fn);
        };
        script.onerror = reject;
        script.src = `assets/scripts/${file}`;

        document.getElementsByTagName('head')[0].appendChild(script);
    });
}
