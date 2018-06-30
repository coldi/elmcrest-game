import setSkillTreeAction from '../actions/setSkillTreeAction';

/**
 * The skill tree state reducer.
 * @param {Object} state The current state
 * @param {Object} action The dispatched action
 * @returns {Object} The next state
 */
export default function skillTree (
    state = [],
    action = {}
) {
    switch (action.type) {
        case `${setSkillTreeAction}`:
            return action.payload.tree;
        default:
            return state;
    }
}
