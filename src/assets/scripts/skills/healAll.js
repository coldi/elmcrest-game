/**
 * Heals all members of the caster's group.
 */
function script({ modules, state, skill, origin }) {
    const { getGroupById } = modules.groups;
    const { getCharacterById } = modules.characters;
    const { characterIds } = getGroupById(state, origin.groupId);

    return characterIds.map(charId => {
        const target = getCharacterById(state, charId);
        const healing =
            target.computed.HPMax *
            skill.baseValue *
            (1 + origin.skills[skill.id] * skill.levelFactor);

        return {
            originId: origin.id,
            targetId: charId,
            effects: [{ name: 'heal', value: healing }],
        };
    });
}
