import { store$ } from '../../middleware';
import isCharacterAlive from '../characters/selectors/isCharacterAlive';
import { characterDied$ } from '../characters/streams';
import {
    getGroupById,
    isPlayerGroup,
    attackGroupAction,
    moveGroupAction,
    setGroupDoneAction,
    createGroupAction,
    removeGroupAction,
} from './';

/**
 * Helps filtering streams by player group id.
 * @param {string} groupId
 * @returns {boolean}
 */
const filterByPlayer = ({ getState, groupId }) => isPlayerGroup(getState(), groupId);

/**
 * A Stream of every action performed by a group.
 */
export const groupAction$ = store$
    .filter(({ action }) => action.meta && action.meta.isGroupCommand)
    .map(input => ({
        ...input,
        groupId: input.action.payload.id,
        coord: input.action.payload.coord,
    }));

/**
 * A Stream of move actions performed by any group.
 */
export const groupMoved$ = groupAction$.filter(
    ({ action }) => action.type === `${moveGroupAction}`
);

/**
 * A Stream of attack actions performed by any group.
 */
export const groupAttacked$ = groupAction$.filter(
    ({ action }) => action.type === `${attackGroupAction}`
);

/**
 * A Stream of every action performed by the player group.
 */
export const playerGroupAction$ = groupAction$.filter(filterByPlayer);

/**
 * A Stream of move actions performed by the player group.
 */
export const playerGroupMoved$ = groupMoved$.filter(filterByPlayer);

/**
 * A Stream of attack actions performed by the player group.
 */
export const playerGroupAttacked$ = groupAttacked$.filter(filterByPlayer);

/**
 * A Stream of every action performed by a group.
 */
export const groupDone$ = store$
    .filter(({ action }) => action.type === `${setGroupDoneAction}`)
    .map(input => ({
        ...input,
        groupId: input.action.payload.id,
    }));

/**
 * A Stream of group creations.
 */
export const groupCreated$ = store$
    .filter(({ action }) => action.type === `${createGroupAction}`)
    .map(input => ({
        ...input,
        group: input.action.payload.group,
    }));

/**
 * A Stream of group removals.
 */
export const groupRemoved$ = store$
    .filter(({ action }) => action.type === `${removeGroupAction}`)
    .map(input => ({
        ...input,
        groupId: input.action.payload.id,
    }));

/**
 * A Stream that emits when the player group died.
 */
export const playerGroupDied$ = characterDied$.filter(
    ({ character, getState }) =>
        isPlayerGroup(getState(), character.groupId) &&
        getGroupById(getState(), character.groupId).characterIds.every(
            id => !isCharacterAlive(getState(), id)
        )
);
