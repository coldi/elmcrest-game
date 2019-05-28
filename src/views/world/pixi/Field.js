/* eslint-disable  no-param-reassign */
import * as PIXI from 'pixi.js';
import TweenMax from 'gsap/TweenMax';
import { colors, makePropReceiver } from '../utils';
import AnimatedTexture from './AnimatedTexture';
/* eslint-disable  no-undef */
const { Sprite } = PIXI;
/* eslint-enable  no-undef */

export default class Field {
    instance = null;
    props = {};
    // store for tweening animations
    tween = null;

    constructor(container, props) {
        this.instance = new Sprite();
        this.instance.anchor.set(0.5, 0.75);

        container.addChild(this.instance);

        if (props) {
            this.update(props);
        }
    }

    update(props) {
        const { instance } = this;
        const receivedProp = makePropReceiver(this, props);

        if (receivedProp('fieldType')) {
            const { resourceId } = props.fieldType;

            instance.texture = AnimatedTexture.fromImage(
                `assets/textures/fields/${resourceId}.png`
            );
        }

        if (receivedProp('discovered')) {
            TweenMax.fromTo(
                instance,
                0.15,
                { alpha: Number(!props.discovered) },
                { alpha: Number(props.discovered) }
            );
            TweenMax.fromTo(instance.scale, 0.3, { x: 0.5, y: 0.5 }, { x: 1, y: 1 });
        }

        if (receivedProp('visible')) {
            const tint = props.visible ? 0xffffff : 0x888888;
            const fromColor = colors.hex2rgb(instance.tint);
            const toColor = colors.hex2rgb(tint);
            // cache tween due to callback usage
            this.tween = TweenMax.to(fromColor, 0.15, {
                ...toColor,
                onUpdate: () => {
                    instance.tint = colors.rgb2hex(fromColor);
                },
            });
        }

        if (receivedProp('index', true)) {
            instance.parent.setChildIndex(instance, props.index);
        }

        if (receivedProp('x') || receivedProp('y')) {
            const { offset = 0 } = props.fieldType;

            instance.x = props.x;
            instance.y = props.y + offset;
        }

        this.props = {
            ...this.props,
            ...props,
        };
    }

    remove() {
        if (this.tween) {
            this.tween.kill();
            this.tween = null;
        }
        this.instance.destroy();
        this.instance = null;
    }
}
