import applyEffects from '../../effects/actions/applyEffects';
import getGroupById from '../../groups/selectors/getGroupById';
import getFieldByCoord from '../../world/selectors/getFieldByCoord';
import getFieldType from '../../world/selectors/getFieldType';
import getCharacterById from '../selectors/getCharacterById';
import getCharactersSettings from '../selectors/getCharactersSettings';

const spendResources = (charId) => (dispatch, getState) => {
    const state = getState();
    const { baseResourceConsumption } = getCharactersSettings(state);
    const char = getCharacterById(state, charId);
    const { coord } = getGroupById(state, char.groupId);
    const { climate, elevation } = getFieldByCoord(state, coord);
    const fieldType = getFieldType(state, climate, elevation);
    const { APUsed } = char.condition;
    const { HPMax } = char.computed;
    // set base resource consumption
    const consumption = { ...baseResourceConsumption };
    const resources = Object.keys(consumption);
    // update consumption by field factors and spent AP
    consumption.water *= fieldType.waterFactor;
    consumption.food *= fieldType.foodFactor;
    consumption.energy *= fieldType.energyFactor * (APUsed / 2);

    // map consumption to mutator effects
    const effects = resources
        .map(key => ({ name: key, value: -consumption[key] }))
        .concat(
            resources
                // lose HP when a resource is 0
                .filter(key => char.condition[key] - consumption[key] <= 0)
                .map(() => ({ name: 'damage', value: HPMax * 0.1 }))
        );

    dispatch(applyEffects(charId, effects));
};

export default spendResources;
