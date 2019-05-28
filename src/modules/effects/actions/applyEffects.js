import getCharacterEffectsById from '../../characters/selectors/getCharacterEffectsById';
import addEffects from '../../characters/actions/addEffects';
import getContextByCharacterId from '../selectors/getContextByCharacterId';
import isMutator from '../utils/isMutator';
import { activeEffectDefaults } from '../definitions';
import applyMutatorEffect from './applyMutatorEffect';

/**
 * Applies status effects on a given character by id.
 * If no effects are passed, the active effects on the character are applied.
 * @param {string} charId A character id
 * @param {Array} [newEffects] A list of effects that should be applied to the character
 * @returns {Function} A redux thunk
 */
const applyEffects = (charId, newEffects) => async (dispatch, getState) => {
    if (newEffects) {
        // monkeypatch proper effect context based on characters combat state.
        // eslint-disable-next-line  no-param-reassign
        newEffects = [].concat(newEffects).map(effect => ({
            ...activeEffectDefaults,
            ...effect,
            context: getContextByCharacterId(getState(), charId),
        }));
    }

    const state = getState();
    const effects = newEffects
        ? // only apply new effects immediately that don't last over time
          newEffects.filter(effect => !effect.duration)
        : // if no new effects were passed, apply active character effects
          getCharacterEffectsById(state, charId);

    const context = getContextByCharacterId(state, charId);
    const isCurrentContext = effect => effect.context === context;

    await Promise.all(
        effects
            // only mutator effects need to be actively applied (dispatched)
            .filter(isMutator)
            // only apply effects for current context
            .filter(isCurrentContext)
            .map(effect => dispatch(applyMutatorEffect(charId, effect)))
    );

    if (!newEffects) return;

    // add new effects to the character that last over time
    const durableEffects = newEffects.filter(effect => effect.duration);

    if (durableEffects.length) {
        dispatch(addEffects(charId, durableEffects));
    }
};

export default applyEffects;
