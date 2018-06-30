import getCurrentBattle from '../combat/selectors/getCurrentBattle';
import { battleTurn$, battleDidEnd$ } from '../combat/streams';
import { turn$ } from '../cycle/streams';
import getPlayerGroup from '../groups/selectors/getPlayerGroup';
import applyEffects from '../effects/actions/applyEffects';
import { levelUp$ } from './streams';
import {
    getCharactersList,
    getBaseCharacterById,
    isCharacterAlive,
    removeExpiredEffects,
    addExpAction,
    updateCharacterAction,
    spendResources,
    resetAPAction,
} from './';

/**
 * Subscription wrapper.
 * @param {Function} subscribe
 */
export default function (subscribe) {
    /**
     * Apply active mutator effects to characters on each new turn.
     * Also remove expired effects.
     */
    subscribe(turn$, ({ dispatch, getState }) => {
        const playerGroup = getPlayerGroup(getState());
        getCharactersList(getState()).forEach(({ id }) => {
            dispatch(removeExpiredEffects(id));
            dispatch(applyEffects(id));

            if (playerGroup && playerGroup.characterIds.includes(id)) {
                dispatch(spendResources(id));
            }

            dispatch(resetAPAction(id));
        });
    });

    /**
     * Apply active mutator effects to characters on each new turn in battle.
     * Also remove expired effects.
     */
    subscribe(battleTurn$, ({ dispatch, getState }) => {
        // only select characters that are in combat
        getCurrentBattle(getState()).characters
            .map(entry => entry.characterId)
            // only consider characters that are alive
            .filter(charId => isCharacterAlive(getState(), charId))
            .forEach((charId) => {
                dispatch(removeExpiredEffects(charId));
                dispatch(applyEffects(charId));
            });
    });

    /**
     * Remove obsolete combat effects from characters when a battle did end.
     */
    subscribe(battleDidEnd$, ({ dispatch, getState, result }) => {
        // only select characters from latest battle
        result.characterIds
            // only consider characters that still exist
            .filter(charId => getBaseCharacterById(getState(), charId))
            .forEach(charId => dispatch(removeExpiredEffects(charId)));

        if (result.victory && result.expGains.length) {
            // add experience to player group's characters
            getPlayerGroup(getState()).characterIds.forEach((charId, index) => {
                dispatch(addExpAction(charId, result.expGains[index]));
            });
        }
    });

    /**
     * Add a base attribute point to a character on level up.
     */
    subscribe(levelUp$, ({ dispatch, getState, characterId, prevLevel, level }) => {
        const { progress } = getBaseCharacterById(getState(), characterId);
        const basePoints = progress.basePoints + (level - prevLevel);

        dispatch(updateCharacterAction(characterId, {
            progress: { basePoints },
        }));
    });
}
