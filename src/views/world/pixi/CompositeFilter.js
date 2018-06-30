import 'pixi.js';
import { makePropReceiver } from '../utils';
import debugShader from './shaders/debug.glsl';
/* eslint-disable  no-undef */
const { Filter, Rectangle } = PIXI;
/* eslint-enable  no-undef */

export default class CompositeFilter {
    container = null;
    filter = null;
    layout = null;
    props = {
        width: 0,
        height: 0,
    };
    uniforms = {
        uTime: 0
    };
    animationFrame = null;

    constructor(compositeShader, uniforms, container, layout, props) {
        this.container = container;
        this.layout = layout;

        this.uniforms = {
            ...this.uniforms,
            ...uniforms
        };

        // Use the debug shader if no shader is set.
        this.filter = new Filter(null, compositeShader || debugShader, this.uniforms);
        this.filter.blendMode = 0; // screen
        this.filter.padding = 0;

        this.container.filters = [this.filter];

        // randomize starting time
        this.uniforms.uTime = Math.random() * 1000;
        // update filter uniforms
        this.filter.uniforms = this.uniforms;

        this.animate = this.animate.bind(this);
        this.animationFrame = requestAnimationFrame(this.animate);

        if (props) {
            this.update(props);
        }
    }

    animate() {
        this.uniforms.uTime += 1.0 / 60.0;

        // update filter uniforms
        this.filter.uniforms = this.uniforms;

        this.animationFrame = requestAnimationFrame(this.animate);
    }

    update(props) {
        const receivedProp = makePropReceiver(this, props);

        if (receivedProp('width') || receivedProp('height')) {
            const {
                width = this.props.width,
                height = this.props.height,
            } = props;

            this.container.filterArea = new Rectangle(0, 0, width, height);
        }

        this.props = {
            ...this.props,
            ...props
        };
    }

    remove() {
        cancelAnimationFrame(this.animationFrame);
        this.container.filters = [];
    }
}
