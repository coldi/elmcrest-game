import clamp from 'lodash/clamp';
import getPlayerGroup from '../../groups/selectors/getPlayerGroup';
import pickWeighted from '../../utils/pickWeighted';
import getCachedFieldByCoord from '../selectors/getCachedFieldByCoord';
import getFieldType from '../selectors/getFieldType';
import getWeatherState from '../selectors/getWeatherState';
import updateWeatherAction from './updateWeatherAction';

const getCloudWeights = (clouds, humidity) => [
    // stay as is
    [1, clouds],
    // less clouds
    [2, clouds > 0
        ? clouds - 0.2
        : 0],
    // more clouds until humidity is reached
    [2, clouds < humidity
        ? clouds + 0.2
        : clouds - 0.2],
    // sudden cloudburst
    [Number(humidity > 0.5) / 2, humidity],
];

const getRainWeights = (rain, clouds, humidity) => [
    // stay as is
    [2, rain],
    // less rain
    [Number(rain > 0) * 2, rain - 0.4],
    // more rain until humidity is reached
    [clouds * 3, rain < humidity
        ? rain + 0.2
        : rain - 0.2],
];

/**
 * Updates the weather conditions based on environment and current player position.
 * @param {boolean} forceUpdate
 * @returns {Function} A redux thunk
 */
const updateWeather = (forceUpdate = false) => (dispatch, getState) => {
    const state = getState();
    const weather = getWeatherState(state);

    const { coord } = getPlayerGroup(state);
    const field = getCachedFieldByCoord(state, coord);
    const fieldType = getFieldType(state, field.climate, field.elevation);

    // discard update if climate zone did not change
    if (weather.climate === field.climate && !forceUpdate) {
        return;
    }

    const cloudWeights = getCloudWeights(weather.clouds, fieldType.humidity);
    const clouds = clamp(
        fieldType.humidity && pickWeighted(cloudWeights, 0)[1],
        0.1 + (fieldType.humidity / 2), 1
    );

    const rainWeights = getRainWeights(weather.rain, clouds, fieldType.humidity);
    const rain = clouds > 0.5
        ? pickWeighted(rainWeights, 0)[1]
        : 0;

    const climate = field.climate;
    const temperature = fieldType.temperature;
    // const clouds = clamp(((rain * 2) - (temperature - 0.5)) / 2, 0.1, 1);

    dispatch(updateWeatherAction({ climate, rain, temperature, clouds }));
};

export default updateWeather;
