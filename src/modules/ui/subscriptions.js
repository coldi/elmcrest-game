import { battleDidStart$, battleDidEnd$ } from '../combat/streams';
import { setUIVisibleAction } from './';

/**
 * Subscription wrapper.
 * @param {Function} subscribe
 */
export default function(subscribe) {
    /**
     * Toggle UI visibility based on combat mode.
     */
    subscribe(battleDidStart$, ({ dispatch }) => dispatch(setUIVisibleAction(false)));
    subscribe(battleDidEnd$, ({ dispatch }) => dispatch(setUIVisibleAction(true)));
}
