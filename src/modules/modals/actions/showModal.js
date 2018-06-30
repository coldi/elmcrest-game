import uid from '../../utils/uid';
import promiseMap from '../../utils/promiseMap';
import { modalDefaults } from '../definitions';
import createModalAction from './createModalAction';

/**
 * Dispatches the createModal action creator and returns
 * a promise that will be resolved when the modal closes.
 * @param {Object|string} options The modal options or message as string
 * @return {Function} A redux thunk
 */
const showModal = options => (dispatch) => {
    const id = uid();
    let modalOptions = {};

    if (typeof options === 'object') {
        modalOptions = options;
    } else if (typeof options === 'string') {
        modalOptions.message = options;
    }

    dispatch(createModalAction({
        id,
        ...modalDefaults,
        ...modalOptions,
    }));

    return promiseMap.create(id);
};

export default showModal;
