/**
 * Attacks all members of the target's group.
 */
function script({ modules, state, skill, origin, target }) {
    const { getGroupById } = modules.groups;
    const { getBaseDamage } = modules.characters;
    const { characterIds } = getGroupById(state, target.groupId);

    return characterIds.map(charId => {
        const baseDamage = getBaseDamage(state, origin.id, charId);
        const damage =
            baseDamage *
            skill.baseValue *
            (1 + origin.skills[skill.id] * skill.levelFactor);

        return {
            originId: origin.id,
            targetId: charId,
            effects: [{ name: 'damage', value: damage }],
        };
    });
}
