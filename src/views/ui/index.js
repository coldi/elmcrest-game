import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCycleState } from '../../modules/cycle';
import { startEvent } from '../../modules/events';
import { getSceneState } from '../../modules/world';
import {
    getPlayerGroup,
    getGroupAP,
    getGroupAPMax,
    setGroupDoneAction,
} from '../../modules/groups';
import {
    CHARACTER_WINDOW,
    getGeneralUIState,
    getActiveWindowId,
    toggleWindow,
    selectCharacterIdAction
} from '../../modules/ui';
import {
    Button,
    Panel,
    ViewAnchor,
    ProgressBar,
} from '../common';
import { KEY } from '../constants';
import T from '../i18n';
import DevTool from './windows/DevTool';
import Character from './windows/Character';
import Skills from './windows/Skills';
import UILayout from './UILayout';
import UILog from './UILog';
import WindowBar from './WindowBar';
import PlayerGroup from './PlayerGroup';
import FieldContext from './FieldContext';
import styles from './index.scss';


export class UIContainer extends React.PureComponent {

    static propTypes = {
        activeUI: PropTypes.bool,
        visibleUI: PropTypes.bool,
        cycle: PropTypes.shape(),
        player: PropTypes.shape(),
        availableAP: PropTypes.number,
        maxAP: PropTypes.number,
        APCost: PropTypes.number,
        actionQueue: PropTypes.arrayOf(PropTypes.shape()),
        selectedCoord: PropTypes.arrayOf(PropTypes.number),
        numCoordsInView: PropTypes.number,
        logMessages: PropTypes.arrayOf(PropTypes.shape()),
        activeWindowId: PropTypes.string,
        toggleWindow: PropTypes.func,
        setPlayerDone: PropTypes.func,
        selectCharacter: PropTypes.func,
    };

    static defaultProps = {};

    state = {};

    constructor (props) {
        super(props);

        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentDidMount () {
        document.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount () {
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    handleKeyUp (e) {
        if (e.which === KEY.SPACE) {
            this.props.setPlayerDone();
        }

        this.props.player.characterIds.forEach((id, index) => {
            if (e.which === KEY[`NUM${(index + 1)}`]) {
                this.props.selectCharacter(id);
            }
        });
    }

    render() {
        const { props } = this;

        return (
            <UILayout active={props.activeUI} visible={props.visibleUI}>

                <ViewAnchor align="topLeft" front>
                    <WindowBar
                        activeId={props.activeWindowId}
                        onSelect={props.toggleWindow}
                        windows={{
                            devTool: {
                                component: <DevTool />,
                                key: KEY.T
                            },
                            character: {
                                component: <Character groupId={props.player.id} />,
                                key: KEY.C
                            },
                            skills: {
                                component: <Skills groupId={props.player.id} />,
                                key: KEY.K
                            },
                        }}
                    />
                </ViewAnchor>

                <div className={styles.controlBar}>
                    <div className={styles.overlay}>
                        <div className={styles.center}>
                            {!props.actionQueue.length ? (
                                <div className={styles.actions}>
                                    <Button
                                        highlight={!props.availableAP}
                                        onClick={() => props.triggerEvent('common-actions')}
                                    >
                                        <T>ui.commonActions</T>
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                        <div className={styles.context}>
                            <FieldContext coord={props.selectedCoord} />
                        </div>
                    </div>

                    <div className={styles.apBar}>
                        <ProgressBar
                            key={props.APCost}
                            value={props.availableAP}
                            max={props.maxAP}
                            label={<T>char.attr.AP</T>}
                            maxLabel={`${props.availableAP} / ${props.maxAP}`}
                            segmented
                            segmentHighlight={props.APCost}
                        />
                    </div>
                    <Panel>
                        <div className={styles.flex}>
                            <PlayerGroup
                                playerGroupId={props.player.id}
                                onSelect={props.selectCharacter}
                            />
                            <UILog />
                        </div>
                    </Panel>
                </div>

            </UILayout>
        );
    }
}

export default connect(
    (state) => ({
        activeUI: getGeneralUIState(state).active,
        visibleUI: getGeneralUIState(state).visible,
        selectedCharacterId: getGeneralUIState(state).selectedCharacterId,
        cycle: getCycleState(state),
        player: getPlayerGroup(state),
        availableAP: getGroupAP(state, getPlayerGroup(state).id),
        maxAP: getGroupAPMax(state, getPlayerGroup(state).id),
        APCost: getPlayerGroup(state).tempActionQueue.reduce((cost, action) => (
            cost + action.payload.cost
        ), 0),
        actionQueue: getPlayerGroup(state).actionQueue,
        selectedCoord: getSceneState(state).selectedCoord,
        numCoordsInView: getSceneState(state).coordsInView.length,
        activeWindowId: getActiveWindowId(state),
    }),
    (dispatch) => ({
        toggleWindow: (id, active) => (
            dispatch(toggleWindow(id, active))
        ),
        setPlayerDone: (id) => (
            dispatch(setGroupDoneAction(id, true))
        ),
        selectCharacter: (id) => (
            dispatch(selectCharacterIdAction(id))
        ),
        triggerEvent: (id) => dispatch(startEvent(id)),
    }),
    (stateProps, dispatchProps) => ({
        ...stateProps,
        ...dispatchProps,
        setPlayerDone () {
            dispatchProps.setPlayerDone(stateProps.player.id);
        },
        selectCharacter (id) {
            const windowId = stateProps.activeWindowId
                ? stateProps.activeWindowId
                : CHARACTER_WINDOW;
            const active = (
                stateProps.selectedCharacterId !== id ||
                stateProps.activeWindowId !== windowId
            );

            dispatchProps.selectCharacter(id);
            dispatchProps.toggleWindow(windowId, active);
        },
    })
)(UIContainer);
