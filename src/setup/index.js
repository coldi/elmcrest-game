import log from '../modules/utils/log';
import i18n from './i18n';
import scene from './scene';
import effects from './effects';
import skills from './skills';
import events from './events';
import qualities from './qualities';
import affixes from './affixes';
import itemTypes from './itemTypes';
import fieldTypes from './fieldTypes';
import start from './start';

/**
 * Runs all setup scripts in a defined order and returns a Promise.
 * @param {Function} dispatch
 * @param {boolean} hasSavedState
 * @returns {Promise}
 */
export default async function runSetup(dispatch, hasSavedState) {
    // set up scripts that should always run
    const batch = [
        i18n,
        scene,
        effects,
        skills,
        events,
        fieldTypes,
        qualities,
        affixes,
        itemTypes,
    ];

    // set up scripts that run only if no saved state was found
    if (!hasSavedState) {
        batch.push(start);
    }

    // run all scripts sequentially
    await batch.reduce(
        (current, next) =>
            current.then(() => {
                log.info(`[SETUP] Prepare ${next.name} ...`);
                return dispatch(next);
            }),
        Promise.resolve()
    );
}
