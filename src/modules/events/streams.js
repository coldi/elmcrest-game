import { store$ } from '../../middleware';
import setCurrentEventAction from './actions/setCurrentEventAction';
import preEventAction from './actions/preEventAction';

/**
 * Emits when the current event state changed.
 */
export const eventWillStart$ = store$
    .filter(({ action }) => action.type === `${preEventAction}`)
    .map(input => ({
        ...input,
        eventId: input.action.payload.id,
    }));

/**
 * Emits when the current event state changed.
 */
export const currentEventChanged$ = store$.filter(
    ({ action }) => action.type === `${setCurrentEventAction}`
);

/**
 * Emits when an event did start.
 */
export const eventDidStart$ = currentEventChanged$
    .filter(({ action }) => !!action.payload.event)
    .map(input => ({
        ...input,
        eventId: input.action.payload.event.id,
    }));

/**
 * Emits when an event did start.
 */
export const eventDidEnd$ = currentEventChanged$.filter(
    ({ action }) => action.payload.event === null
);
