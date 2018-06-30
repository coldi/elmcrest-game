/**
 * A basic skill that heals the target.
 */
function script ({ skill, origin, target }) {
    const healing = target.computed.HPMax * skill.baseValue *
        (1 + (origin.skills[skill.id] * skill.levelFactor));

    return [{
        originId: origin.id,
        targetId: target.id,
        effects: [{ name: 'heal', value: healing }],
    }];
}
