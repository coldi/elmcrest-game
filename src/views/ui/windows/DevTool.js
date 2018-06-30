import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSceneState } from '../../../modules/world';
import { getPlayerGroup } from '../../../modules/groups';
import { addItem } from '../../../modules/inventories';
import {
    DEVTOOL_WINDOW,
    toggleWindow,
    getGeneralUIState,
} from '../../../modules/ui';
import { saveState, removeSavedState } from '../../../modules/savegames';
import { showModal } from '../../../modules/modals';
import { startEvent } from '../../../modules/events';
import T from '../../i18n';
import {
    Block,
    Button,
    Compass,
    Grid,
    Heading,
    Panel,
    ProgressBar,
    Tabs,
    Tooltip,
    Window,
} from '../../common';


export class DevToolContainer extends React.PureComponent {

    static propTypes = {
        activeUI: PropTypes.bool,
        player: PropTypes.object,
        selectedCoord: PropTypes.arrayOf(PropTypes.number),
        numCoordsInView: PropTypes.number,
        closeWindow: PropTypes.func,
        dispatch: PropTypes.func,
    };

    static defaultProps = {};

    state = {};

    render() {
        const {
            activeUI,
            player,
            selectedCoord,
            numCoordsInView,
            dispatch,
        } = this.props;

        const confirmRemoveSavedState = async () => {
            if (await dispatch(showModal('ui.removeSaveGameConfirmation'))) {
                dispatch(removeSavedState());
            }
        };

        const addPlayerItem = (itemTypeId) => {
            dispatch(addItem(player.inventoryId, itemTypeId));
        };

        return (
            <Window onClose={this.props.closeWindow}>
                <Panel title={<T>ui.windows.devTool.title</T>}>
                    <Tabs>
                        <Tabs.Item label="World Info">
                            <Block>
                                <ProgressBar
                                    value={numCoordsInView}
                                    max={800}
                                    label="Rendered Fields"
                                    maxLabel={numCoordsInView}
                                />
                            </Block>
                            <Block noGap>UI active: {`${activeUI}`}</Block>
                            <Block noGap>Player coord: {`${player.coord}`}</Block>
                            <Block noGap>Selected coord: {`${selectedCoord}`}</Block>
                            <Block>
                                <Tooltip>
                                    <Tooltip.Content>
                                        <Compass origin={player.coord} destination={[0, 0]} small />
                                    </Tooltip.Content>
                                    <u>Direction to 0,0</u>
                                </Tooltip>
                            </Block>
                        </Tabs.Item>

                        <Tabs.Item label="Save Game">
                            <Block>
                                <Grid smallGap>
                                    <Grid.Item>
                                        <Button onClick={() => dispatch(saveState())} small>
                                            Save game
                                        </Button>
                                    </Grid.Item>
                                    <Grid.Item>
                                        <Button onClick={confirmRemoveSavedState} small>
                                            Remove saved game
                                        </Button>
                                    </Grid.Item>
                                </Grid>
                            </Block>
                        </Tabs.Item>

                        <Tabs.Item label="Generate Stuff">
                            <Block>
                                <Heading sub>Items</Heading>
                                <Grid smallGap>
                                    <Grid.Item>
                                        <Button
                                            onClick={() => addPlayerItem('test-wearable')}
                                            small
                                        >
                                            Wearable item
                                        </Button>
                                    </Grid.Item>
                                    <Grid.Item>

                                        <Button
                                            onClick={() => addPlayerItem('test-consumable')}
                                            small
                                        >
                                            Consumable item
                                        </Button>
                                    </Grid.Item>
                                </Grid>
                            </Block>

                            <Block>
                                <Heading sub>Events</Heading>
                                <Grid smallGap>
                                    <Grid.Item>
                                        <Button
                                            onClick={() => dispatch(startEvent('test'))}
                                            small
                                        >
                                            Test Event
                                        </Button>
                                    </Grid.Item>
                                </Grid>
                            </Block>
                        </Tabs.Item>
                    </Tabs>
                </Panel>
            </Window>
        );
    }
}

export default connect(
    (state) => ({
        activeUI: getGeneralUIState(state).active,
        player: getPlayerGroup(state),
        selectedCoord: getSceneState(state).selectedCoord,
        numCoordsInView: getSceneState(state).coordsInView.length,
    }),
    (dispatch) => ({
        closeWindow: () => (
            dispatch(toggleWindow(DEVTOOL_WINDOW, false))
        ),
        dispatch,
    })
)(DevToolContainer);
