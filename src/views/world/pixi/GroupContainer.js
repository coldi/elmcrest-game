/* eslint-disable  no-param-reassign */
import * as PIXI from 'pixi.js';
import differenceBy from 'lodash/differenceBy';
import { getCell } from '../../../modules/hex';
import Group from './Group';
/* eslint-disable  no-undef */
const { Container } = PIXI;
/* eslint-enable  no-undef */

export default class GroupContainer {
    instance = null;

    props = {
        groups: [],
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

        if (props.groups !== undefined) {
            // get groups that have been removed from props
            differenceBy(this.props.groups, props.groups, 'id')
                // update their visibility
                .forEach(({ id }) => this.cache.get(id).update({ visible: false }));

            props.groups.forEach(group => {
                const { id, coord } = group;

                let groupInstance;

                // check if an instance for this group exists
                if (this.cache.has(id)) {
                    // update existing instance
                    groupInstance = this.cache.get(id);
                } else {
                    // create new instance
                    groupInstance = new Group(instance);
                }

                // register instance with current key
                this.cache.set(id, groupInstance);

                // update instance position
                const { x, y } = this.layout.cellToPixel(getCell(coord)).round();
                // update group instance
                groupInstance.update({ ...group, x, y, visible: true });
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
