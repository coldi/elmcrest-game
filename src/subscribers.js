/**
 * A store for all module subscriptions.
 * @type {Array}
 */
const subscriptions = [];

/**
 * A wrapper for subscribe() that gets injected into each module subscriber.
 * Performs subscriptions and adds them to the store.
 * @param {Observable} stream$
 * @param {Function} subscriberFn
 */
const handleModuleSubscribers = (stream$, subscriberFn) => {
    subscriptions.push(
        stream$.subscribe(subscriberFn)
    );
};

/**
 * Unsubscribes from all stored subscriptions.
 */
export const unsubscribe = () => {
    subscriptions
        .splice(0)
        .forEach(subscription => subscription.unsubscribe());
};

/**
 * Calls each module subscriber function and passes the
 * handleModuleSubscribers handler to it.
 * @param {Function[]} modules Array of module subscriptions
 * @returns {Function} A reference to unsubscribe
 */
export default function subscribeToModules (modules) {
    // unsubscribe from previous subscriptions
    if (subscriptions.length) {
        unsubscribe();
    }

    modules.forEach(module => module(handleModuleSubscribers));

    return unsubscribe;
}
