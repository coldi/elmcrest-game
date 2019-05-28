import Immutable from 'seamless-immutable';
import getCharacterById from '../../characters/selectors/getCharacterById';
import getBaseCharacterById from '../../characters/selectors/getBaseCharacterById';
import updateCharacterAction from '../../characters/actions/updateCharacterAction';
import getEffectScriptById from '../selectors/getEffectScriptById';
import isMutatorScript from '../utils/isMutatorScript';
import operate from '../utils/operate';
import applyMutatorOptions from '../utils/applyMutatorOptions';

/**
 * Applies a mutator effect.
 * @param {string} charId
 * @param {Object} effect
 * @param {Object} options
 * @returns {Function} A redux thunk
 */
const applyMutatorEffect = (charId, effect, options) => async (dispatch, getState) => {
    if (isMutatorScript(effect)) {
        // apply the given effect script
        const mutate = await getEffectScriptById(effect.name);
        const char = getCharacterById(getState(), charId);

        return dispatch(mutate(char, effect, applyMutatorEffect));
    }

    // apply a shortcode script, e.g. '+=base.str'
    const char = getBaseCharacterById(getState(), charId);
    const operator = effect.name.slice(0, 2);
    const path = effect.name.slice(2).split('.');
    const updatedChar = Immutable.updateIn(char, path, (prop = 0) =>
        applyMutatorOptions(operate(prop, operator, effect.value), options)
    );

    return dispatch(updateCharacterAction(charId, updatedChar));
};

export default applyMutatorEffect;
