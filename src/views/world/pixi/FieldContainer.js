/* eslint-disable  no-param-reassign */
import * as PIXI from 'pixi.js';
import debounce from 'lodash/debounce';
import { getCell } from '../../../modules/hex';
import { getKeyFromCoord } from '../../../modules/world';
import { FIELD_REFRESH_DELAY } from '../constants';
import Field from './Field';
/* eslint-disable  no-undef */
const { Container } = PIXI;
/* eslint-enable  no-undef */

export default class FieldContainer {
    instance = null;
    props = {
        fields: [],
    };

    layout = null;
    cache = new Map();
    refreshWhenIdle = null;
    refreshCallback = null;

    constructor(container, layout, props) {
        this.instance = new Container();
        this.layout = layout;

        container.addChild(this.instance);

        if (props) {
            this.update(props);
        }

        this.refresh = this.refresh.bind(this);
        this.refreshWhenIdle = debounce(() => {
            this.refreshCallback = requestIdleCallback(this.refresh);
        }, FIELD_REFRESH_DELAY);
    }

    refresh() {
        // find all field instances that are not visible anymore and remove them
        this.cache.forEach((instance, key) => {
            if (!this.props.fields.find(field => getKeyFromCoord(field.coord) === key)) {
                instance.remove();
                this.cache.delete(key);
            }
        });
    }

    update(props) {
        const { instance } = this;

        if (props.fields !== undefined) {
            props.fields.forEach((field, index) => {
                const { coord } = field;
                const key = getKeyFromCoord(coord);

                // check if an instance for this field exists
                if (this.cache.has(key)) {
                    // update existing instance
                    this.cache.get(key).update({ ...field, index });

                    return;
                }

                // create new instance
                const fieldInstance = new Field(instance);
                // register instance with current key
                this.cache.set(key, fieldInstance);

                // update instance position
                const { x, y } = this.layout.cellToPixel(getCell(coord)).round();
                // update field instance
                fieldInstance.update({ ...field, index, x, y });
            });

            this.refreshWhenIdle();
        }

        this.props = {
            ...this.props,
            ...props,
        };
    }

    remove() {
        cancelIdleCallback(this.refreshCallback);
        this.instance.destroy();
        this.instance = null;
    }
}
