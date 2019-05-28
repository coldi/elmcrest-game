import * as characters from '../../characters';
import * as effects from '../../effects';
import * as groups from '../../groups';
import * as combat from '../../combat';
import * as hex from '../../hex';
import * as inventories from '../../inventories';
import * as items from '../../items';
import * as world from '../../world';

/**
 * Returns an object of that contains access to modules and current state.
 * @param {Object} state The global state
 * @return {Object} A redux thunk
 */
const getScriptApi = state => ({
    state,
    modules: {
        characters,
        effects,
        groups,
        combat,
        hex,
        inventories,
        items,
        world,
    },
});

export default getScriptApi;
