import { store$ } from '../../middleware';
import interactWithCoord from './actions/interactWithCoord';
import updateSceneAction from './actions/updateSceneAction';
import mergeMapFieldsAction from './actions/mergeMapFieldsAction';

/**
 * Emits when the selected coord changed.
 */
export const coordSelected$ = store$
    .filter(
        ({ action }) =>
            action.type === `${updateSceneAction}` && action.payload.update.selectedCoord
    )
    .map(input => ({
        ...input,
        coord: input.action.payload.update.selectedCoord,
    }));

/**
 * Emits when user has interacted with a coord (e.g. by clicking).
 */
export const coordInteraction$ = store$
    .filter(({ action }) => action.type === `${interactWithCoord}`)
    .map(input => ({
        ...input,
        coord: input.action.payload.coord,
    }));

/**
 * Emits when the world map updated.
 */
export const mapDidUpdate$ = store$
    .filter(
        ({ action }) =>
            action.type === `${mergeMapFieldsAction}` && action.payload.fields.length > 0
    )
    .map(input => ({
        ...input,
        fields: input.action.payload.fields,
    }));
