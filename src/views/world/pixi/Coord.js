/* eslint-disable  no-param-reassign */
import * as PIXI from 'pixi.js';
import { makePropReceiver } from '../utils';
/* eslint-disable  no-undef */
const { Graphics, Text } = PIXI;
/* eslint-enable  no-undef */

const CORNERS = 6;
const ANGLE = (Math.PI * 2) / CORNERS;

const calcCorner = (i, size) => {
    const angle = ANGLE * i;
    return [size * Math.cos(angle), size * Math.sin(angle)];
};

const calcPoints = size => {
    const points = [];

    for (let i = 0; i < CORNERS; i += 1) {
        points.push(calcCorner(i, size / 2));
    }

    return points;
};

const textStyle = {
    fill: 0x666666,
    fontSize: 14,
    fontWeight: 'bold',
    align: 'center',
    // strokeThickness: 2,
};

export default class Coord {
    instance = null;
    text = null;
    props = {};

    constructor(container, props) {
        this.instance = new Graphics();
        this.text = new Text('', textStyle);
        this.text.anchor.set(0.5, 0.5);

        this.instance.addChild(this.text);
        container.addChild(this.instance);

        if (props) {
            this.update(props);
        }
    }

    draw(props) {
        const size = props.size || this.props.size;
        const color = props.color || this.props.color;

        this.instance.clear();
        this.instance.lineStyle(0, color);
        this.instance.beginFill(color, 1);

        calcPoints(size).forEach(([x, y], i) => {
            if (i === 0) {
                this.instance.moveTo(x, y);
                return;
            }
            this.instance.lineTo(x, y);
        });

        this.instance.closePath();
        this.instance.endFill();
    }

    update(props) {
        const { instance } = this;
        const receivedProp = makePropReceiver(this, props);

        if (receivedProp('size') || receivedProp('color')) {
            this.draw(props);
        }

        if (receivedProp('text')) {
            this.text.text = props.text;
        }

        if (receivedProp('textColor')) {
            this.text.style.fill = props.textColor;
        }

        if (receivedProp('visible')) {
            instance.visible = props.visible;
        }

        if (receivedProp('x') && receivedProp('y')) {
            instance.x = props.x;
            instance.y = props.y;
        }

        this.props = {
            ...this.props,
            ...props,
        };
    }

    remove() {
        this.instance.clear();
        this.instance.destroy();
        this.instance = null;
    }
}
