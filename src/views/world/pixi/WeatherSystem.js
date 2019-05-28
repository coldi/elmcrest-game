import { getCell } from '../../../modules/hex';
import { makePropReceiver, tween } from '../utils';
import CompositeFilter from './CompositeFilter';
import weatherShader from './shaders/weather.glsl';

const translateDayTime = dayTime => {
    // let night level alternate between 0..1..0
    const nightLevel = dayTime >= 0.5 ? (1 - dayTime) * 2 : dayTime * 2;

    // tweak result so that day time is longer than night time
    if (nightLevel < 0.5) return 0;
    if (nightLevel >= 0.5 && nightLevel < 0.65) return 0.5;
    if (nightLevel >= 0.65 && nightLevel < 0.75) return 0.75;
    return 1;
};

export default class WeatherSystem {
    filter = null;
    layout = null;
    props = {};

    constructor(container, layout, props) {
        const initialUniforms = {
            uWindDirection: [-1.0, 1.0],
            uCloudDensity: 0.5,
            uWorldOffset: [0, 0],
            uWorldOrigin: [0, 0],
            uWorldScale: 1,
            uRainIntensity: 0,
            uTemperature: 0,
            uNightLevel: 0,
        };

        this.filter = new CompositeFilter(
            weatherShader,
            initialUniforms,
            container,
            layout,
            props
        );
        this.layout = layout;
    }

    update(props) {
        const receivedProp = makePropReceiver(this, props);
        const { uniforms } = this.filter;

        this.filter.update(props);

        if (receivedProp('weather')) {
            tween(uniforms, {
                // uWindDirection: props.weather.wind,
                uCloudDensity: props.weather.clouds,
                uTemperature: props.weather.temperature,
                uRainIntensity: props.weather.rain,
            });
        }

        if (receivedProp('dayTime')) {
            tween(uniforms, { uNightLevel: translateDayTime(props.dayTime) });
        }

        if (receivedProp('scale')) {
            uniforms.uWorldScale = props.scale;
        }

        if (
            receivedProp('x') ||
            receivedProp('y') ||
            receivedProp('scale') ||
            receivedProp('group')
        ) {
            const {
                x = this.props.x,
                y = this.props.y,
                group = this.props.group,
            } = props;
            const pos = this.layout.cellToPixel(getCell(group.coord));
            this.filter.uniforms.uWorldOrigin = [pos.x, pos.y];
            this.filter.uniforms.uWorldOffset = [x, y];
        }

        this.props = {
            ...this.props,
            ...props,
        };
    }
}
