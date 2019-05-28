/**
 * Alias for restoring AP.
 */
function script(character, effect, alias) {
    return alias(
        character.id,
        {
            ...effect,
            name: '-=condition.APUsed',
        },
        {
            clamp: [0, character.computed.APMax],
            round: true,
        }
    );
}
