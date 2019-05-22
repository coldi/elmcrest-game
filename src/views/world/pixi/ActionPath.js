/* eslint-disable  no-param-reassign */
import * as PIXI from 'pixi.js';
import { getCell } from '../../../modules/hex';
import { moveGroupAction } from '../../../modules/groups';
import Coord from './Coord';
/* eslint-disable  no-undef */
const { Graphics } = PIXI;
/* eslint-enable  no-undef */

export default class Field {
    instance = null;
    props = {};

    layout = null;
    children = [];

    constructor(container, layout, props) {
        this.instance = new Graphics();
        this.layout = layout;

        container.addChild(this.instance);

        if (props) {
            this.update(props);
        }
    }

    clear() {
        this.instance.clear();
        this.children.forEach(instance => instance.remove());
        this.children = [];
    }

    update(props) {
        const { instance, layout } = this;

        if (props.group !== this.props.group) {
            const { group, availableAP = 0 } = props;

            const queue = group.tempActionQueue.length
                ? group.tempActionQueue
                : group.actionQueue;

            if (this.props.group && this.props.group.tempActionQueue === queue) {
                // skip update if queue is empty or has already been rendered
                return;
            }

            this.clear();

            if (!queue.length) {
                return;
            }

            const initialAction = moveGroupAction(group.id, group.coord);
            const actions = [initialAction].concat(queue);
            let totalActionCosts = 0;

            // shape size for a full coord
            const coordSize = layout.size / 6;
            // shape size for steps between coords
            const stepSize = layout.size / 10;
            // shape size for a dangerous coord
            const dangerSize = layout.size / 2;

            actions.forEach((action, index, list) => {
                const { coord } = action.payload;
                const currentPos = layout.cellToPixel(getCell(coord));

                const nextAction = list[index + 1];

                if (nextAction) {
                    const nextCost = nextAction.payload.cost;
                    // sum action costs
                    totalActionCosts += nextCost || 0;

                    // set up path definition
                    const nextCoord = nextAction.payload.coord;
                    const nextPos = layout.cellToPixel(getCell(nextCoord));
                    // determine if next action is considered dangerous
                    const isDangerous = nextAction.type !== `${moveGroupAction}`;
                    // determine if path requires more AP than available
                    const exceedsAP = totalActionCosts > availableAP;
                    // set up color
                    const color = isDangerous || exceedsAP ? 0xee0000 : 0xffffff;
                    const textColor = isDangerous || exceedsAP ? 0xffffff : 0x666666;

                    const numSteps = 3;
                    // draw steps for next action
                    for (let i = 1; i <= numSteps; i += 1) {
                        const size =
                            i < numSteps // eslint-disable-line
                                ? stepSize
                                : isDangerous
                                ? dangerSize
                                : coordSize;

                        const text = i === numSteps && nextCost ? totalActionCosts : '';

                        this.children.push(
                            new Coord(instance, {
                                x:
                                    currentPos.x +
                                    ((nextPos.x - currentPos.x) / numSteps) * i,
                                y:
                                    currentPos.y +
                                    ((nextPos.y - currentPos.y) / numSteps) * i,
                                text,
                                size,
                                color,
                                textColor,
                            })
                        );
                    }
                }
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
