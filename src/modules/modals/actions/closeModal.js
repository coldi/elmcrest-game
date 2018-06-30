import promiseMap from '../../utils/promiseMap';
import removeModalAction from './removeModalAction';

/**
 * Closes an open modal and resolves the mapped promise.
 * @param {number} id A modal id
 * @param {boolean} confirmed A flag whether the modal was confirmed or not
 * @returns {Function} A redux thunk
 */
const closeModal = (id, confirmed = false) => (dispatch) => {
    promiseMap.resolve(id, confirmed);

    dispatch(removeModalAction(id));
};

export default closeModal;
