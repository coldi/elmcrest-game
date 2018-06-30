/**
 * A very basic skill that deals damage.
 */
function script ({ modules, state, skill, origin, target }) {
    const { getBaseDamage } = modules.characters;
    const baseDamage = getBaseDamage(state, origin.id, target.id);
    const damage = (baseDamage * skill.baseValue) *
        (1 + (origin.skills[skill.id] * skill.levelFactor));

    return [{
        originId: origin.id,
        targetId: target.id,
        effects: [{ name: 'damage', value: damage }],
    }];
}
