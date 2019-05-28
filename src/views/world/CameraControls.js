import values from 'lodash/values';
import { getPoint } from '../../modules/hex';
import { KEY } from '../constants';
import {
    CAMERA_PAN_SPEED,
    CAMERA_ZOOM_SPEED,
    CAMERA_MIN_ZOOM,
    CAMERA_MAX_ZOOM,
} from './constants';

const DIRECTION_ANGLE = Math.PI / 2;

const DIRECTIONS = [
    -DIRECTION_ANGLE * 2.5, // down-left
    DIRECTION_ANGLE * 2, // down
    -DIRECTION_ANGLE * 1.5, // down-right
    -DIRECTION_ANGLE * 3, // left
    null, // center, no direction
    -DIRECTION_ANGLE, // right
    -DIRECTION_ANGLE * 3.5, // up-left
    0, // up
    -DIRECTION_ANGLE * 0.5, // up-right
];

export default class CameraControls {
    position = getPoint([]);
    offset = getPoint([]);
    onClick = () => {};
    onPointerDown = () => {};
    onPointerUp = () => {};
    onPointerMove = () => {};
    onCameraMove = () => {};
    onCameraStop = () => {};

    element = document;

    input = {
        key: {
            left: false,
            up: false,
            right: false,
            down: false,
            q: false,
            e: false,
        },
        pointer: {
            left: false,
            middle: false,
            right: false,
        },
        wheel: {
            up: false,
            down: false,
        },
    };
    pointer = {
        screen: getPoint([]),
        normalized: getPoint([]),
        drag: {
            active: false,
            start: null,
            end: null,
            vector: null,
            angle: 0,
            distance: 0,
        },
    };

    panSpeed = CAMERA_PAN_SPEED;
    dragSpeed = 1 / CAMERA_PAN_SPEED;
    zoomSpeed = CAMERA_ZOOM_SPEED;
    minZoom = CAMERA_MIN_ZOOM;
    maxZoom = CAMERA_MAX_ZOOM;

    animationFrame;

    constructor(props) {
        Object.keys(props).forEach(key => {
            if (key in this) {
                this[key] = props[key];
            }
        });

        this.offset.y = 1;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
        this.process = this.process.bind(this);

        this.bindEvents();
    }

    update(props = {}) {
        let changed = false;

        if (props.position && !this.position.equals(props.position)) {
            this.position = props.position;
            changed = true;
        }

        if (props.offset && !this.offset.equals(props.offset)) {
            this.offset = props.offset;
            changed = true;
        }

        if (changed) {
            this.onCameraMove({
                position: this.position.toArray(),
                offset: this.offset.toArray(),
            });
        }
    }

    bindEvents() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        this.element.addEventListener('mousedown', this.handleMouseDown);
        this.element.addEventListener('mousemove', this.handleMouseMove);
        this.element.addEventListener('mouseup', this.handleMouseUp);
        this.element.addEventListener('wheel', this.handleWheel, { passive: true });
        this.process();
    }

    unbindEvents() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
        this.element.removeEventListener('mousedown', this.handleMouseDown);
        this.element.removeEventListener('mousemove', this.handleMouseMove);
        this.element.removeEventListener('mouseup', this.handleMouseUp);
        this.element.removeEventListener('wheel', this.handleWheel);
        cancelAnimationFrame(this.animationFrame);
    }

    receiveInput() {
        const key = values(this.input.key).indexOf(true) !== -1;
        const pointer = values(this.input.pointer).indexOf(true) !== -1;
        const wheel = values(this.input.wheel).indexOf(true) !== -1;

        return {
            any: key || pointer || wheel,
            key,
            pointer,
            wheel,
        };
    }

    pan(angle, distance) {
        const position = this.position.clone();
        const baseAngle = -DIRECTION_ANGLE;

        position.x -= Math.cos(baseAngle + angle) * distance;
        position.y += Math.sin(baseAngle + angle) * distance;

        this.update({ position });
    }

    zoom(distance) {
        const { minZoom, maxZoom } = this;
        const offset = this.offset.clone();

        if (offset.y + distance >= minZoom && offset.y + distance <= maxZoom) {
            offset.y += distance;

            this.update({ offset });
        }
    }

    calcDirectionalInput() {
        const { input } = this;

        const dx = Number(input.key.right) - Number(input.key.left);
        const dy = Number(input.key.up) - Number(input.key.down);

        const directionIndex = 3 * dy + dx + 4;

        return DIRECTIONS[directionIndex];
    }

    updateDragInfo() {
        const { pointer } = this;

        if (pointer.drag.end) {
            const totalDistance = pointer.screen.distance(pointer.drag.start);
            pointer.drag.distance = pointer.screen.distance(pointer.drag.end);

            pointer.drag.vector = getPoint([
                pointer.screen.x - pointer.drag.end.x,
                pointer.screen.y - pointer.drag.end.y,
            ]);

            pointer.drag.angle = Math.atan2(pointer.drag.vector.x, pointer.drag.vector.y);

            pointer.drag.active = totalDistance > 10;
        } else {
            pointer.drag.start = pointer.screen.clone();
        }

        // set new drag end to current pointer position
        pointer.drag.end = pointer.screen.clone();
    }

    process() {
        const { input, pointer } = this;

        const receivedInput = this.receiveInput();

        if (receivedInput.pointer) {
            this.updateDragInfo();

            if (pointer.drag.active) {
                if (input.pointer.left) {
                    this.pan(
                        pointer.drag.angle,
                        pointer.drag.distance * this.panSpeed * this.dragSpeed
                    );
                }
            }
        }

        if (receivedInput.key) {
            if (!pointer.drag.active) {
                const angle = this.calcDirectionalInput();

                if (angle !== null) {
                    this.pan(angle, this.panSpeed);
                }
            }
        }

        if (receivedInput.wheel) {
            if (input.wheel.up) {
                this.zoom(this.zoomSpeed);
            }
            if (input.wheel.down) {
                this.zoom(-this.zoomSpeed);
            }
        }

        this.animationFrame = requestAnimationFrame(this.process);
    }

    handleClick() {
        if (this.receiveInput().pointer) {
            if (!this.pointer.drag.active) {
                this.onClick({
                    ...this.pointer,
                    ...this.input.pointer,
                });
            }
        }
    }

    handleInputStop() {
        if (!this.receiveInput().any) {
            this.onCameraStop({
                position: this.position.toArray(),
                offset: this.offset.toArray(),
            });
        }
    }

    handleKeyDown(e) {
        const { input } = this;

        const key = e.keyCode;
        if (key === KEY.LEFT || key === KEY.A) input.key.left = true;
        if (key === KEY.UP || key === KEY.W) input.key.up = true;
        if (key === KEY.RIGHT || key === KEY.D) input.key.right = true;
        if (key === KEY.DOWN || key === KEY.S) input.key.down = true;
        if (key === KEY.Q) input.key.q = true;
        if (key === KEY.E) input.key.e = true;
    }

    handleKeyUp(e) {
        const { input } = this;

        const key = e.keyCode;
        if (key === KEY.LEFT || key === KEY.A) input.key.left = false;
        if (key === KEY.UP || key === KEY.W) input.key.up = false;
        if (key === KEY.RIGHT || key === KEY.D) input.key.right = false;
        if (key === KEY.DOWN || key === KEY.S) input.key.down = false;
        if (key === KEY.Q) input.key.q = false;
        if (key === KEY.E) input.key.e = false;

        this.handleInputStop();
    }

    handleMouseDown(e) {
        const { input } = this;

        input.pointer.left = e.button === 0;
        input.pointer.middle = e.button === 1;
        input.pointer.right = e.button === 2;

        this.onPointerDown({ ...this.pointer });
    }

    handleMouseMove(e) {
        const { offset, pointer } = this;
        const scale = offset.y;

        const x = !e.touches ? e.clientX : e.touches[0].pageX;
        const y = !e.touches ? e.clientY : e.touches[0].pageY;

        pointer.screen.init(x / scale, y / scale);

        const nx = (x / window.innerWidth) * 2 - 1;
        const ny = -((y / window.innerHeight) * 2) + 1;

        pointer.normalized.init(nx, ny);

        if (!this.receiveInput().any) {
            this.onPointerMove({ ...this.pointer });
        }
    }

    handleMouseUp() {
        const { input, pointer } = this;

        this.handleClick();

        this.onPointerUp({ ...this.pointer });

        input.pointer.left = input.pointer.middle = input.pointer.right = false;

        pointer.drag.active = false;
        pointer.drag.start = null;
        pointer.drag.end = null;
        pointer.drag.distance = 0;
        pointer.drag.angle = 0;

        this.handleInputStop();
    }

    handleWheel(e) {
        const { input } = this;

        input.wheel.up = e.deltaY < 0;
        input.wheel.down = e.deltaY > 0;

        requestAnimationFrame(() => {
            // reset wheel input in next frame
            input.wheel.up = input.wheel.down = false;

            // this.handleInputStop()
        });
    }
}
