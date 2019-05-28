import Immutable from 'seamless-immutable';
import uid from '../../utils/uid';
import { characterDefaults } from '../definitions';
import createCharacterAction from './createCharacterAction';

/**
 * Creates a character.
 * @param {Object} props Specific character props
 * @returns {Function} A redux thunk
 */
const createCharacter = (props = {}) => dispatch => {
    const character = Immutable.merge(
        characterDefaults,
        {
            id: uid('char'),
            ...props,
        },
        { deep: true }
    );

    dispatch(createCharacterAction(character));

    return character;
};

export default createCharacter;
