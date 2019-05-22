/**
 * Alias for restoring water resource.
 */
function script(character, effect, alias) {
    return alias(
        character.id,
        {
            ...effect,
            name: '+=condition.water',
            value: effect.value,
        },
        {
            clamp: [0, 1],
        }
    );
}
