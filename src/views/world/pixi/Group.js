/* eslint-disable  no-param-reassign */
import * as PIXI from 'pixi.js';
import TweenMax from 'gsap/TweenMax';
import { makePropReceiver } from '../utils';
import AnimatedTexture from './AnimatedTexture';
/* eslint-disable  no-undef */
const { Sprite } = PIXI;
/* eslint-enable  no-undef */

export default class Group {
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
        const receivedProp = makePropReceiver(this, props);
        const { instance } = this;

        if (receivedProp('leader')) {
            const { resourceId } = props.leader;

            if (resourceId) {
                instance.texture = AnimatedTexture.fromImage(
                    `assets/textures/characters/${resourceId}/world.png`
                );
            }
        }

        if (receivedProp('visible')) {
            this.tween = TweenMax.to(instance, 0.3, {
                alpha: props.visible ? 1 : 0,
            });
        }

        if (receivedProp('x') || receivedProp('y')) {
            if (
                !this.props.visible ||
                (this.props.x === undefined && this.props.y === undefined)
            ) {
                // set initial position immediately
                instance.position.set(props.x, props.y);
            } else {
                // set up tweening transition
                const from = {
                    x: this.props.x,
                    y: this.props.y,
                };
                const to = {
                    x: props.x,
                    y: props.y,
                };

                this.tween = TweenMax.to(from, 0.3, {
                    ...to,
                    onUpdate: () => instance.position.set(from.x, from.y),
                });
            }
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
