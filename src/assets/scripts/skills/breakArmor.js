/**
 * A basic skill that reduces target's armor and deals minor damage.
 */
function script({ modules, state, skill, origin, target }) {
    const { getBaseDamage } = modules.characters;
    const { damage, armor, duration } = skill.baseValue;
    const baseDamage = getBaseDamage(state, origin.id, target.id);
    const finalDamage =
        baseDamage * damage * (1 + origin.skills[skill.id] * skill.levelFactor);

    return [
        {
            originId: origin.id,
            targetId: target.id,
            effects: [
                { name: 'damage', value: finalDamage },
                { name: '*computed.armor', value: armor, duration, rel: skill.id },
            ],
        },
    ];
}
