import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlayer } from '../../modules/characters';
import { getCombatHistoryState } from '../../modules/combat';
import { getPlayerGroup } from '../../modules/groups';
import { transferStack, transferAllStacks } from '../../modules/inventories';
import T from '../i18n';
import { Dialog, ExpProgressBar, Block, InventoryList } from '../common';
import styles from './Result.scss';

class Result extends React.PureComponent {
    static propTypes = {
        result: PropTypes.shape(),
        playerId: PropTypes.string,
        playerInventoryId: PropTypes.string,
        transferStack: PropTypes.func,
        transferAllStacks: PropTypes.func,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        onClose: () => {},
    };

    constructor(props) {
        super(props);

        this.handleTakeAll = this.handleTakeAll.bind(this);
    }

    handleTakeAll() {
        this.props.transferAllStacks();
        this.props.onClose();
    }

    render() {
        const { props } = this;

        return (
            <Dialog
                title="common.victory"
                confirmLabel="ui.takeAll"
                onConfirm={this.handleTakeAll}
                dismissLabel="ui.done"
                onDismiss={props.onClose}
            >
                <div className={styles.container}>
                    <Block>
                        <p>
                            <T params={{ exp: props.result.expGains[0] }}>
                                ui.messages.gainedExp
                            </T>
                        </p>
                        <ExpProgressBar
                            characterId={props.playerId}
                            expGain={props.result.expGains[0]}
                        />
                    </Block>
                    <Block>
                        <p>
                            <T>ui.messages.pickLoot</T>
                        </p>
                        <InventoryList
                            inventoryId={props.result.lootInventoryId}
                            onSelect={stackId => props.transferStack(stackId)}
                            showEquip
                        />
                    </Block>
                </div>
            </Dialog>
        );
    }
}

export default connect(
    state => ({
        result: getCombatHistoryState(state)[0],
        playerId: getPlayer(state).id,
        playerInventoryId: getPlayerGroup(state).inventoryId,
    }),
    dispatch => ({
        transferStack: (...args) => {
            dispatch(transferStack(...args));
        },
        transferAllStacks: (...args) => {
            dispatch(transferAllStacks(...args));
        },
    }),
    (stateProps, dispatchProps, ownProps) => ({
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        transferStack: stackId =>
            stackId &&
            dispatchProps.transferStack(
                stateProps.result.lootInventoryId,
                stackId,
                stateProps.playerInventoryId
            ),
        transferAllStacks: () =>
            dispatchProps.transferAllStacks(
                stateProps.result.lootInventoryId,
                stateProps.playerInventoryId
            ),
    })
)(Result);
