/* eslint-disable  no-param-reassign */
import * as PIXI from 'pixi.js';
import differenceBy from 'lodash/differenceBy';
import { getCell } from '../../../modules/hex';
import Event from './Event';
/* eslint-disable  no-undef */
const { Container } = PIXI;
/* eslint-enable  no-undef */

export default class EventContainer {
    instance = null;
    props = {
        events: [],
    };

    layout = null;
    cache = new Map();

    constructor(container, layout, props) {
        this.instance = new Container();
        this.layout = layout;

        container.addChild(this.instance);

        if (props) {
            this.update(props);
        }
    }

    update(props) {
        const { instance } = this;

        if (props.events !== undefined) {
            // get events that have been removed from props
            differenceBy(this.props.events, props.events, 'instanceId')
                // remove them from cache
                .forEach(({ instanceId }) => {
                    if (this.cache.has(instanceId)) {
                        this.cache.get(instanceId).remove();
                        this.cache.delete(instanceId);
                    }
                });

            props.events.forEach(event => {
                const { instanceId, coord } = event;

                let eventInstance;

                // check if an instance for this group exists
                if (this.cache.has(instanceId)) {
                    // update existing instance
                    eventInstance = this.cache.get(instanceId);
                } else {
                    // create new instance
                    eventInstance = new Event(instance);
                }

                // register instance with current key
                this.cache.set(instanceId, eventInstance);

                // update instance position
                const { x, y } = this.layout.cellToPixel(getCell(coord)).round();
                // update group instance
                eventInstance.update({ ...event, x, y, visible: true });
            });
        }

        this.props = {
            ...this.props,
            ...props,
        };
    }

    remove() {
        this.instance.destroy();
        this.instance = null;
    }
}
