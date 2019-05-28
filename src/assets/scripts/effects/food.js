/**
 * Alias for restoring food resource.
 */
function script(character, effect, alias) {
    return alias(
        character.id,
        {
            ...effect,
            name: '+=condition.food',
            value: effect.value,
        },
        {
            clamp: [0, 1],
        }
    );
}
