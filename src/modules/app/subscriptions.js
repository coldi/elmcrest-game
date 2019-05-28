import { playerGroupDied$ } from '../groups/streams';
import { showModal } from '../modals';

/**
 * Subscription wrapper.
 * @param {Function} subscribe
 */
export default function(subscribe) {
    /**
     * Handle game over when player died.
     */
    subscribe(playerGroupDied$, ({ dispatch }) => {
        dispatch(
            showModal({
                title: 'common.gameOver',
                message: 'common.gameOverMessage',
                dismiss: null,
            })
        );
    });
}
