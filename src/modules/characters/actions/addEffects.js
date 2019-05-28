import log from '../../utils/log';
import getCurrentTurn from '../../cycle/selectors/getCurrentTurn';
import isCharacterInBattle from '../../combat/selectors/isCharacterInBattle';
import getBattleTurn from '../../combat/selectors/getBattleTurn';
import getContextByCharacterId from '../../effects/selectors/getContextByCharacterId';
import { activeEffectDefaults } from '../../effects/definitions';
import getCharacterById from '../selectors/getCharacterById';
import addEffectsAction from './addEffectsAction';
import removeEffectAction from './removeEffectAction';

/**
 * Adds one or more status effects to a character.
 * @param {string} charId A character id
 * @param {Object|Array} effects One or more effects
 * @returns {Function} A redux thunk
 */
const addEffects = (charId, effects) => (dispatch, getState) => {
    if (!Array.isArray(effects)) {
        // eslint-disable-next-line  no-param-reassign
        effects = [effects];
    }

    const state = getState();
    const char = getCharacterById(state, charId);

    const processedEffects = effects.reduce((list, props) => {
        const { name, rel } = props;
        const hasSimilarEffect = !!char.effects.find(
            effect => effect.name === name && effect.rel == rel // eslint-disable-line  eqeqeq
        );

        if (hasSimilarEffect) {
            dispatch(removeEffectAction(charId, { name, rel }));
            log.warn(`Effect '${props.name}' gets re-applied to character '${char.id}'.`);
        }

        const effect = {
            ...activeEffectDefaults,
            ...props,
            context: getContextByCharacterId(state, charId),
        };

        effect.begin = isCharacterInBattle(state, charId)
            ? getBattleTurn(state)
            : getCurrentTurn(state);

        return list.concat([effect]);
    }, []);

    dispatch(addEffectsAction(charId, processedEffects));

    return processedEffects;
};

export default addEffects;
