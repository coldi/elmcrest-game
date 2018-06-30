/**
 * Alias for decreasing hit points of a character.
 */
function script (character, effect, alias) {
    return alias(character.id, {
        ...effect,
        name: '+=condition.HPLost',
        value: Math.round(effect.value)
    }, {
        clamp: [0, character.computed.HPMax],
        round: true,
    });
}
