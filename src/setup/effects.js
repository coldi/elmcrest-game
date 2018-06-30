import { registerEffect } from '../modules/effects';
import { effectDefaults } from '../modules/effects/definitions';
import loadJSON from '../modules/utils/loadJSON';

/**
 * Registers effects.
 */
export default function effects (dispatch) {
    return loadJSON('effects.json')
        .then(data => data.map(effect => ({
            ...effectDefaults,
            ...effect,
        })))
        .then(effects => effects.map(
            effect => dispatch(registerEffect(effect))
        ));
}
