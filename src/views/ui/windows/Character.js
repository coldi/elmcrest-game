import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCharacterById } from '../../../modules/characters';
import { getGroupById } from '../../../modules/groups';
import { removeFromStack, unequipStack, useStack } from '../../../modules/inventories';
import {
    getGeneralUIState,
    getWindowById,
    CHARACTER_WINDOW,
    toggleWindow,
    updateWindowStateAction,
} from '../../../modules/ui';
import {
    Block,
    CharacterBars,
    CharacterSelection,
    CharacterStats,
    EffectsList,
    Equipment,
    Grid,
    Heading,
    InventoryList,
    Panel,
    StackContextMenuList,
    Tabs,
    Window,
} from '../../common';
import T from '../../i18n';
import styles from './Character.scss';


export class CharacterContainer extends React.PureComponent {

    static propTypes = {
        groupId: PropTypes.string.isRequired,
        group: PropTypes.shape(),
        character: PropTypes.shape(),
        selectedCharacterId: PropTypes.string,
        selectedStackId: PropTypes.string,
        closeWindow: PropTypes.func,
        selectStackId: PropTypes.func,
        useInventoryStack: PropTypes.func,
        unequipInventoryStack: PropTypes.func,
        removeFromInventoryStack: PropTypes.func,
    };

    static defaultProps = {};

    state = {};

    useStack (stackId) {
        const {
            group: { inventoryId },
            selectedStackId,
            selectedCharacterId,
            useInventoryStack,
            selectStackId,
        } = this.props;

        const stack = useInventoryStack(
            inventoryId,
            stackId || selectedStackId,
            selectedCharacterId
        );

        if (!stack || stack.equipped) {
            selectStackId(null);
        }
    }

    unequipStack (stackId) {
        const {
            group: { inventoryId },
            selectedCharacterId,
            unequipInventoryStack,
        } = this.props;

        unequipInventoryStack(inventoryId, stackId, selectedCharacterId);
    }

    removeFromStack (stackId) {
        const {
            group: { inventoryId },
            selectedStackId,
            removeFromInventoryStack,
            selectStackId,
        } = this.props;

        if (removeFromInventoryStack(inventoryId, stackId || selectedStackId, 1)) {
            selectStackId(null);
        }
    }

    render () {
        const { props } = this;

        return (
            <Window onClose={props.closeWindow}>
                <Grid smallGap noWrap>
                    <Grid.Item>
                        <Panel title={<T>ui.windows.equipment.title</T>}>
                            <CharacterSelection characterIds={props.group.characterIds}>
                                {(charId) => (
                                    <div className={styles.stats}>
                                        <Block>
                                            <Equipment
                                                characterId={charId}
                                                onUnequip={stackId => this.unequipStack(stackId)}
                                            />
                                        </Block>
                                        <div className={styles.name}>
                                            <Heading minor>
                                                {props.character.name},&nbsp;
                                                <T>common.level</T> {props.character.computed.level}
                                            </Heading>
                                        </div>
                                        <CharacterBars
                                            characterId={charId}
                                            name
                                            exp
                                            HP
                                            AP
                                            resources
                                        />
                                        <Tabs>
                                            <Tabs.Item label={<T>common.attributes</T>}>
                                                <CharacterStats
                                                    key={charId}
                                                    characterId={charId}
                                                    editable
                                                />
                                            </Tabs.Item>

                                            <Tabs.Item label={<T>common.effects</T>}>
                                                <EffectsList effects={props.character.effects} />
                                            </Tabs.Item>
                                        </Tabs>
                                    </div>
                                )}
                            </CharacterSelection>
                        </Panel>
                    </Grid.Item>
                    <Grid.Item>
                        <Panel title={<T>ui.windows.inventory.title</T>}>
                            <InventoryList
                                inventoryId={props.group.inventoryId}
                                selectedStackId={props.selectedStackId}
                                onSelect={props.selectStackId}
                                onUse={(stackId) => this.useStack(stackId)}
                                contextMenuList={(stackId) => (
                                    <StackContextMenuList
                                        stackId={stackId}
                                        inventoryId={props.group.inventoryId}
                                        onUse={() => this.useStack(stackId)}
                                        onDrop={() => this.removeFromStack(stackId)}
                                    />
                                )}
                            />
                        </Panel>
                    </Grid.Item>
                </Grid>
            </Window>
        );
    }
}

export default connect(
    (state, props) => {
        const group = getGroupById(state, props.groupId);
        const selectedCharacterId = (
            getGeneralUIState(state).selectedCharacterId || group.characterIds[0]
        );
        const selectedStackId = getWindowById(state, CHARACTER_WINDOW).selectedStackId;
        const character = getCharacterById(state, selectedCharacterId);

        return {
            group,
            character,
            selectedCharacterId,
            selectedStackId,
        };
    },
    (dispatch) => ({
        closeWindow: () => (
            dispatch(toggleWindow(CHARACTER_WINDOW, false))
        ),
        selectStackId: (stackId) => (
            dispatch(updateWindowStateAction(
                CHARACTER_WINDOW,
                { selectedStackId: stackId }
            ))
        ),
        useInventoryStack: (...args) => (
            dispatch(useStack(...args))
        ),
        unequipInventoryStack: (...args) => (
            dispatch(unequipStack(...args))
        ),
        removeFromInventoryStack: (...args) => (
            dispatch(removeFromStack(...args))
        ),
    })
)(CharacterContainer);
