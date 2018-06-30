import Immutable from 'seamless-immutable';
import invariant from '../../utils/invariant';
import { effectDefaults } from '../definitions';
import registerEffectAction from './registerEffectAction';

/**
 * Registers a effect.
 * @param {Object} props Specific effect props
 * @returns {Function} A redux thunk
 */
const registerEffect = (
    props = {},
) => (dispatch) => {
    invariant(props.id, 'An id is required to register an effect.');

    const effect = Immutable.merge(
        effectDefaults,
        props
    );

    dispatch(registerEffectAction(effect));

    return effect;
};

export default registerEffect;
