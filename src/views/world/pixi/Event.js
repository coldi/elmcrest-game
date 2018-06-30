/* eslint-disable  no-param-reassign */
import 'pixi.js';
import TweenMax from 'gsap/TweenMax';
import { makePropReceiver } from '../utils';
import AnimatedTexture from './AnimatedTexture';
/* eslint-disable  no-undef */
const { Sprite } = PIXI;
/* eslint-enable  no-undef */

export default class Event {

    instance = null;
    props = {};
    // store for tweening animations
    tween = null;

    constructor (container, props) {
        this.instance = new Sprite();
        this.instance.anchor.set(0.5, 0.75);

        container.addChild(this.instance);

        if (props) {
            this.update(props);
        }
    }

    update (props) {
        const receivedProp = makePropReceiver(this, props);
        const { instance } = this;

        if (receivedProp('meta')) {
            instance.texture = AnimatedTexture.fromImage(`assets/textures/events/${props.meta.resourceId}.png`);
            instance.texture.animationInterval = 30;
        }

        if (receivedProp('visible')) {
            this.tween = TweenMax.to(instance, 0.3, {
                alpha: props.visible ? 1 : 0,
            });
        }

        if (receivedProp('x') || receivedProp('y')) {
            instance.position.set(props.x, props.y);
        }

        this.props = {
            ...this.props,
            ...props,
        };
    }

    remove () {
        if (this.tween) {
            this.tween.kill();
            this.tween = null;
        }
        this.instance.destroy();
        this.instance = null;
    }
}
