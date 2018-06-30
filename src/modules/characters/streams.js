import { store$ } from '../../middleware';
import addExpAction from './actions/addExpAction';
import updateCharacterAction from './actions/updateCharacterAction';
import getCharacterById from './selectors/getCharacterById';
import getPlayer from './selectors/getPlayer';
import isCharacterAlive from './selectors/isCharacterAlive';

/**
 * Emits when a character received experience.
 */
export const receivedExp$ = store$
    .filter(({ action }) => action.type === `${addExpAction}`)
    .map((input) => ({
        ...input,
        characterId: input.action.payload.id,
    }));

/**
 * Emits when a character reached a new level.
 */
export const levelUp$ = receivedExp$
    .filter(({ prevState, getState, characterId }) => {
        const prevChar = getCharacterById(prevState, characterId);
        const char = getCharacterById(getState(), characterId);

        return char.computed.level > prevChar.computed.level;
    })
    .map((input) => ({
        ...input,
        prevLevel: getCharacterById(input.prevState, input.characterId).computed.level,
        level: getCharacterById(input.getState(), input.characterId).computed.level,
    }));

/**
 * Emits when the player character reached a new level.
 */
export const playerLevelUp$ = levelUp$.filter(
    ({ getState, characterId }) => getPlayer(getState()).id === characterId
);

/**
 * Emits when a character is updated.
 */
export const characterDidUpdate$ = store$
    .filter(({ action }) => action.type === `${updateCharacterAction}`)
    .map((input) => ({
        ...input,
        prevCharacter: getCharacterById(input.prevState, input.action.payload.id),
        character: getCharacterById(input.getState(), input.action.payload.id),
    }));

/**
 * Emits when a character died.
 */
export const characterDied$ = characterDidUpdate$.filter(
    ({ getState, character }) => !isCharacterAlive(getState(), character.id)
);

/**
 * Emits when the player character died.
 */
export const playerDied$ = characterDied$.filter(
    ({ getState, character }) => getPlayer(getState()).id === character.id
);
