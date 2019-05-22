import { activeEffectDefaults } from '../../modules/effects/definitions';

export default function transformEffects(state, effects) {
    if (!effects) return [];

    return effects
        .split('|')
        .map(string => string.split(','))
        .map(([name, value, duration]) => ({
            ...activeEffectDefaults,
            name,
            value: Number(value),
            duration: Number(duration),
        }));
}
