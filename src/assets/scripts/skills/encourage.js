/**
 * A group buff.
 * Increases stats of all group members.
 */
function script ({ modules, state, skill, origin }) {
    const { getGroupById } = modules.groups;
    const { str, armor, duration } = skill.baseValue;
    const { characterIds } = getGroupById(state, origin.groupId);
    const bonus = str * (1 + (origin.skills[skill.id] * skill.levelFactor));

    return characterIds.map(charId => ({
        originId: origin.id,
        targetId: charId,
        effects: [
            { name: '+base.str', value: bonus, duration, rel: skill.id },
            { name: '*computed.armor', value: armor, duration, rel: skill.id },
        ],
    }));
}
