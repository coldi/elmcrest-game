import getCurrentPhaseMembers from './getCurrentPhaseMembers';
import getGroupById from '../../groups/selectors/getGroupById';

/**
 * Returns true if all members of the current phase are 'done'.
 * @param {Object} state The global state
 * @return {boolean}
 */
const getPhaseDoneState = (state) => {
    const phase = getCurrentPhaseMembers(state);

    if (phase.length === 0) {
        return true;
    }

    return phase.every((member) => (
        getGroupById(state, member.groupId).isDone
    ));
};

export default getPhaseDoneState;
