/**
 * Alias for restoring energy resource.
 */
function script(character, effect, alias) {
    return alias(
        character.id,
        {
            ...effect,
            name: '+=condition.energy',
            value: effect.value,
        },
        {
            clamp: [0, 1],
        }
    );
}
