/* eslint-disable  no-param-reassign */
import * as PIXI from 'pixi.js';
import { makePropReceiver } from '../utils';
import FieldContainer from './FieldContainer';
import GroupContainer from './GroupContainer';
import EventContainer from './EventContainer';
import ActionPath from './ActionPath';
import WeatherSystem from './WeatherSystem';
/* eslint-disable  no-undef */
const { Application, Container, Graphics } = PIXI;
// skip pixi console banner
PIXI.utils.skipHello();
/* eslint-enable  no-undef */

export default class Scene {
    element;
    layout;

    app = null;
    props = {};

    background = null;
    backgroundColor = 0xeeeeee;
    zoomContainer = null;
    sceneContainer = null;
    fieldContainer = null;
    uiContainer = null;
    groupContainer = null;
    eventContainer = null;
    weatherSystem = null;

    constructor(element, layout, props) {
        this.element = element;
        this.layout = layout;

        this.app = new Application({ antialias: true, transparent: false });

        this.background = this.app.stage.addChild(new Graphics());
        this.zoomContainer = this.app.stage.addChild(new Container());
        this.sceneContainer = this.zoomContainer.addChild(new Container());

        this.fieldContainer = new FieldContainer(this.sceneContainer, layout);
        this.uiContainer = new ActionPath(this.sceneContainer, layout);
        this.groupContainer = new GroupContainer(this.sceneContainer, layout);
        this.eventContainer = new EventContainer(this.sceneContainer, layout);

        this.weatherSystem = new WeatherSystem(this.app.stage, layout);

        this.element.appendChild(this.app.view);

        if (props) {
            this.update(props);
        }
    }

    update(props) {
        const receivedProp = makePropReceiver(this, props);

        if (receivedProp('scale')) {
            this.zoomContainer.scale.set(props.scale);
            this.weatherSystem.update(props);
        }

        if (receivedProp('x') || receivedProp('y')) {
            const { x = this.props.x, y = this.props.y } = props;
            this.sceneContainer.position.set(x, y);
            this.weatherSystem.update(props);
        }

        if (receivedProp('weather') || receivedProp('dayTime')) {
            this.weatherSystem.update(props);
        }

        if (receivedProp('width') || receivedProp('height')) {
            const { width = this.props.width, height = this.props.height } = props;
            this.app.renderer.resize(width, height);
            this.weatherSystem.update(props);

            this.background.clear();
            this.background.beginFill(this.backgroundColor, 1);
            this.background.drawRect(0, 0, width, height);
        }

        if (receivedProp('fields')) {
            this.fieldContainer.update(props);
        }

        if (receivedProp('groups')) {
            this.groupContainer.update(props);
        }

        if (receivedProp('events')) {
            this.eventContainer.update(props);
        }

        if (receivedProp('group')) {
            this.uiContainer.update(props);
            this.weatherSystem.update(props);
        }

        this.props = {
            ...this.props,
            ...props,
        };
    }
}
