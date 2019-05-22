import reject from 'lodash/reject';
import Immutable from 'seamless-immutable';
import {
    addEffectsAction,
    createCharacterAction,
    removeCharacterAction,
    removeEffectAction,
    spendAPAction,
    resetAPAction,
    updateCharacterAction,
    addExpAction,
} from '../';

/**
 * The characters state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function characters(state = {}, action = {}) {
    switch (action.type) {
        case `${addEffectsAction}`: {
            const { id } = action.payload;
            const newEffects = action.payload.effects;

            return Immutable.updateIn(state, [id, 'effects'], effects =>
                effects.concat(newEffects)
            );
        }

        case `${createCharacterAction}`: {
            const { character } = action.payload;

            return Immutable.set(state, character.id, character);
        }

        case `${removeCharacterAction}`: {
            const { id } = action.payload;

            return state.without(id);
        }

        case `${removeEffectAction}`: {
            const { id, props } = action.payload;

            return Immutable.updateIn(state, [id, 'effects'], effects =>
                reject(effects, props)
            );
        }

        case `${spendAPAction}`: {
            const { ids, cost } = action.payload;

            return ids.reduce(
                (nextState, id) =>
                    Immutable.updateIn(
                        nextState,
                        [id, 'condition', 'APUsed'],
                        APUsed => APUsed + cost
                    ),
                state
            );
        }

        case `${resetAPAction}`: {
            const { ids } = action.payload;

            return ids.reduce(
                (nextState, id) =>
                    Immutable.setIn(nextState, [id, 'condition', 'APUsed'], 0),
                state
            );
        }

        case `${addExpAction}`: {
            const { id, exp } = action.payload;

            return Immutable.updateIn(
                state,
                [id, 'progress', 'exp'],
                currentExp => currentExp + exp
            );
        }

        case `${updateCharacterAction}`: {
            const { id, props } = action.payload;

            return Immutable.updateIn(state, [id], character =>
                Immutable.merge(character, props, { deep: true })
            );
        }

        default:
            return state;
    }
}
