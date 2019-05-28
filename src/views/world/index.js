import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import { getLayout, getPoint } from '../../modules/hex';
import { setUIActiveAction } from '../../modules/ui';
import { getDayTime } from '../../modules/cycle';
import {
    getSceneState,
    getWeatherState,
    getFieldsInView,
    updateSceneAction,
    updateView,
    interactWithCoord,
} from '../../modules/world';
import { getPlayerGroup, getGroupsInView, getGroupAP } from '../../modules/groups';
import { getEventsInView } from '../../modules/events';
import CameraControls from './CameraControls';
import { TILE_SIZE } from './constants';
import Scene from './pixi';
import styles from './styles.scss';

export class WorldContainer extends React.PureComponent {
    static propTypes = {
        fields: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        groups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        player: PropTypes.shape().isRequired,
        availableAP: PropTypes.number.isRequired,
        dayTime: PropTypes.number.isRequired,
        scene: PropTypes.shape().isRequired,
        weather: PropTypes.shape().isRequired,
        setUIActive: PropTypes.func.isRequired,
        resizeWindow: PropTypes.func.isRequired,
        setCamera: PropTypes.func.isRequired,
        updateView: PropTypes.func.isRequired,
        setSelectedCoord: PropTypes.func.isRequired,
        clickCoord: PropTypes.func.isRequired,
    };

    layout = getLayout(TILE_SIZE);
    lastTransform = {};

    camera;
    scene;
    element;

    animationFrame;
    debouncedWindowResize;

    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);
        this.setElementRef = this.setElementRef.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlePointerDown = this.handlePointerDown.bind(this);
        this.handlePointerUp = this.handlePointerUp.bind(this);
        this.handlePointerMove = this.handlePointerMove.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleCameraMove = this.handleCameraMove.bind(this);
        this.debouncedWindowResize = debounce(this.handleWindowResize, 100);
    }

    componentDidMount() {
        const { props } = this;

        this.camera = new CameraControls({
            position: getPoint(props.scene.cameraPosition),
            offset: getPoint(props.scene.cameraOffset),
            onClick: this.handleClick,
            onPointerMove: this.handlePointerMove,
            onPointerDown: this.handlePointerDown,
            onPointerUp: this.handlePointerUp,
            onCameraMove: this.handleCameraMove,
            onCameraStop: props.setCamera,
            element: this.element,
        });

        this.scene = new Scene(this.element, this.layout, {
            ...this.calcViewTransformation(), // x, y, scale
            width: props.scene.viewWidth,
            height: props.scene.viewHeight,
            fields: props.fields,
            groups: props.groups,
            group: props.player,
            events: props.events,
            availableAP: props.availableAP,
            dayTime: props.dayTime,
            weather: props.weather,
        });

        if (!props.fields.length) {
            this.handleCameraMove();
        }

        this.animate();

        window.addEventListener('resize', this.debouncedWindowResize);
    }

    componentDidUpdate(prevProps) {
        const { props, camera } = this;

        // update camera from props
        if (
            props.scene.cameraPosition !== prevProps.scene.cameraPosition ||
            props.scene.cameraOffset !== prevProps.scene.cameraOffset
        ) {
            const nextCameraPosition = getPoint(props.scene.cameraPosition);
            const nextCameraOffset = getPoint(props.scene.cameraOffset);

            if (
                !camera.position.equals(props.scene.cameraPosition) ||
                !camera.offset.equals(props.scene.cameraOffset)
            ) {
                this.camera.update({
                    position: nextCameraPosition,
                    offset: nextCameraOffset,
                });
            }
        }

        // resize scene viewport from props
        if (
            props.scene.viewWidth !== prevProps.scene.viewWidth ||
            props.scene.viewHeight !== prevProps.scene.viewHeight
        ) {
            this.scene.update({
                width: props.scene.viewWidth,
                height: props.scene.viewHeight,
            });
        }

        // update scene fields from props
        if (props.fields !== prevProps.fields) {
            this.scene.update({ fields: props.fields });
        }

        // update scene fields from props
        if (props.dayTime !== prevProps.dayTime) {
            this.scene.update({ dayTime: props.dayTime });
        }

        // update scene groups from props
        if (props.groups !== prevProps.groups) {
            this.scene.update({ groups: props.groups });
        }

        // update scene events from props
        if (props.events !== prevProps.events) {
            this.scene.update({ events: props.events });
        }

        // update weather from props
        if (props.weather !== prevProps.weather) {
            this.scene.update({ weather: props.weather });
        }

        // update queue related data from props
        if (props.player !== prevProps.player) {
            this.scene.update({
                group: props.player,
                availableAP: props.availableAP,
            });
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animationFrame);
        window.removeEventListener('resize', this.debouncedWindowResize);

        this.camera.unbindEvents();
    }

    getScale() {
        if (!this.camera) {
            return 1;
        }

        return this.camera.offset.y;
    }

    getScaledViewDimensions(divider = 1) {
        const { viewWidth, viewHeight } = this.props.scene;
        const scale = this.getScale();

        return {
            width: viewWidth / scale / divider,
            height: viewHeight / scale / divider,
        };
    }

    calcViewTransformation() {
        // calc scale
        const { width, height } = this.getScaledViewDimensions();
        const scale = this.getScale();
        // calc translation
        const { position } = this.camera;
        const x = -position.x + width / 2;
        const y = -position.y + height / 2;

        return { x, y, scale };
    }

    castScreenToCoord(screenPoint) {
        return this.layout
            .pixelToCell(screenPoint)
            .round()
            .toArray2D();
    }

    getCoordFromPointer({ screen }) {
        const { width, height } = this.getScaledViewDimensions(2);
        const screenPosition = screen
            .add(this.camera.position)
            .sub(getPoint([width, height]));

        return this.castScreenToCoord(screenPosition);
    }

    getBoundingCoords(position) {
        const { width, height } = this.getScaledViewDimensions(2);

        const left = position.x - width;
        const right = position.x + width;
        const top = position.y - height;
        const bottom = position.y + height;

        // repeat for each corner
        const topLeft = this.castScreenToCoord(getPoint([left, top]));
        const topRight = this.castScreenToCoord(getPoint([right, top]));
        const bottomLeft = this.castScreenToCoord(getPoint([left, bottom]));
        const bottomRight = this.castScreenToCoord(getPoint([right, bottom]));

        return [topLeft, topRight, bottomRight, bottomLeft];
    }

    handleClick(pointer) {
        const coord = this.getCoordFromPointer(pointer);
        this.props.clickCoord(coord);
    }

    handlePointerDown() {
        this.props.setUIActive(false);
    }

    handlePointerUp() {
        this.props.setUIActive(true);
    }

    handlePointerMove(pointer) {
        const coord = this.getCoordFromPointer(pointer);
        const { selectedCoord } = this.props.scene;

        if (!isEqual(selectedCoord, coord)) {
            this.props.setSelectedCoord(coord);
        }
    }

    handleCameraMove() {
        const { props, camera } = this;

        const coords = this.getBoundingCoords(camera.position);
        props.updateView(coords);
    }

    handleWindowResize() {
        if (this.element) {
            const { clientWidth, clientHeight } = this.element;
            this.props.resizeWindow(clientWidth, clientHeight);
        }
    }

    animate() {
        const transform = this.calcViewTransformation();

        // update scene viewport
        if (!isEqual(transform, this.lastTransform)) {
            const { x, y, scale } = transform;
            this.scene.update({ x, y, scale });

            this.lastTransform = transform;
        }

        this.animationFrame = requestAnimationFrame(this.animate);
    }

    setElementRef(ref) {
        this.element = ref;
    }

    render() {
        return <div ref={this.setElementRef} className={styles.container} />;
    }
}

export default connect(
    state => {
        const player = getPlayerGroup(state);

        return {
            player,
            fields: getFieldsInView(state),
            groups: getGroupsInView(state),
            events: getEventsInView(state),
            dayTime: getDayTime(state),
            weather: getWeatherState(state),
            availableAP: getGroupAP(state, player.id),
            scene: getSceneState(state),
        };
    },
    dispatch => ({
        setUIActive: active => dispatch(setUIActiveAction(active)),
        resizeWindow: (viewWidth, viewHeight) =>
            dispatch(updateSceneAction({ viewWidth, viewHeight })),
        setCamera: ({ position, offset }) =>
            dispatch(
                updateSceneAction({
                    cameraPosition: position,
                    cameraOffset: offset,
                })
            ),
        updateView: coords => dispatch(updateView(coords)),
        setSelectedCoord: selectedCoord => dispatch(updateSceneAction({ selectedCoord })),
        clickCoord: coord => dispatch(interactWithCoord(coord)),
    })
)(WorldContainer);
