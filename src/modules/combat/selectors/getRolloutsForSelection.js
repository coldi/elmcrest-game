import getScriptApi from '../../app/selectors/getScriptApi';
import getCharacterById from '../../characters/selectors/getCharacterById';
import isCharacterAlive from '../../characters/selectors/isCharacterAlive';
import getSkillScriptById from '../../skills/selectors/getSkillScriptById';
import getSkillById from '../../skills/selectors/getSkillById';
import { rolloutDefaults } from '../definitions';
import getCombatUIState from './getCombatUIState';
import getQueuedEntries from './getQueuedEntries';

/**
 * Returns the rollouts for the given selection.
 * If no selection is passed, the current selection
 * from combat ui state will be used.
 * @param {Object} state
 * @param {Object} selection
 * @returns {Array}
 */
const getRolloutsForSelection = async (state, selection = null) => {
    const { characterId, skillId } = selection || getCombatUIState(state).selection;

    const [active] = getQueuedEntries(state);

    const originId = active.characterId;
    const targetId = characterId;

    const script = await getSkillScriptById(skillId);
    const skill = getSkillById(state, skillId);
    const origin = getCharacterById(state, originId);
    // we may not receive a selected target
    const target = targetId ? getCharacterById(state, targetId) : null;

    const scriptApi = getScriptApi(state);
    const result = script({ ...scriptApi, skill, origin, target });

    // map skill result impacts to individual rollouts
    return result
        .filter(impact => isCharacterAlive(state, impact.targetId))
        .map((impact, index) => ({
            ...rolloutDefaults,
            skillId,
            // actual rollout only contains the one impact
            result: [impact],
            originId: impact.originId,
            targetId: impact.targetId,
            skipDelayUpdate: index > 0,
            delay: 300,
        }));
};

export default getRolloutsForSelection;
