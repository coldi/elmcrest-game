import {
    setCurrentEventAction,
    setCurrentEventSceneAction,
    setCurrentEventStateAction,
    addActionToCurrentEventAction,
} from '../';

/**
 * The current event state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function currentEvent (
    state = null,
    action = {}
) {
    switch (action.type) {

        case `${setCurrentEventAction}`: {
            const { event } = action.payload;

            return event || null;
        }

        case `${setCurrentEventSceneAction}`: {
            const { sceneId } = action.payload;

            return {
                ...state,
                scenes: [
                    ...state.scenes,
                    sceneId,
                ],
            };
        }

        case `${setCurrentEventStateAction}`: {
            const { eventState } = action.payload;

            return state ? {
                ...state,
                state: {
                    ...state.state,
                    ...eventState,
                },
            } : null;
        }

        case `${addActionToCurrentEventAction}`: {
            const { actionId } = action.payload;
            return {
                ...state,
                actions: [
                    ...state.actions,
                    actionId,
                ],
            };
        }

        default: {
            return state;
        }

    }
}
